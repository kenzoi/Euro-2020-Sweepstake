const { nanoid } = require("nanoid");
const db = require("../models");

const createPool = async (req, res) => {
  try {
    // TODO: get userId from auth middleware instead of body
    const { id } = req.body;
    const user = await db.user.findOne({
      where: { id },
    });
    const pool = await db.pool.create({
      nanoId: nanoid(10),
    });
    await pool.addUser(user, { through: { owner: true } });
    res.status(200).json(pool);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

// WIP
const getPools = async (req, res) => {
  try {
    // TODO: get userId from auth middleware instead of body
    const { id } = req.body;
    const pools = await db.user.findOne({
      where: { id },
      attributes: ["id", "email", "name"],
      include: {
        model: db.pool,
        attributes: ["id", "nanoId"],
        // TODO: see if there is a better way to include the pool owner
        // include: { model: db.user_pool, attributes: ["owner"] },
      },
    });
    res.status(200).json(pools);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const joinPool = async (req, res) => {
  try {
    // TODO: get userId from auth middleware instead of body
    const { id } = req.body;
    const { nanoId } = req.params;
    const user = await db.user.findOne({
      where: { id },
    });
    const pool = await db.pool.findOne({
      where: { nanoId },
    });
    await pool.addUser(user, { through: { owner: false } });
    res.status(200).json(pool);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  createPool,
  getPools,
  joinPool,
};
