const { nanoid } = require("nanoid");
const { poolQuery } = require("../helper");
const db = require("../models/pg");

const createPool = async (req, res) => {
  try {
    // TODO: get userId from auth middleware instead of params
    const { userId } = req.params;
    const user = await db.user.findOne({
      where: { id: userId },
    });
    const pool = await db.pool.create({
      nanoId: nanoid(10),
    });
    await pool.addUser(user, { through: { owner: true } });
    const pools = await db.user.findOne(poolQuery(userId));
    res.status(200).json(pools);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const getPools = async (req, res) => {
  try {
    // TODO: get userId from auth middleware instead of params
    const { userId } = req.params;
    const pools = await db.user.findOne(poolQuery(userId));
    res.status(200).json(pools);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const joinPool = async (req, res) => {
  try {
    // TODO: get userId from auth middleware instead of params
    const { nanoId, userId } = req.params;
    const user = await db.user.findOne({
      where: { id: userId },
    });
    const pool = await db.pool.findOne({
      where: { nanoId },
    });
    if (pool) {
      await pool.addUser(user, { through: { owner: false } });
      const pools = await db.user.findOne(poolQuery(userId));
      res.status(200).json(pools);
    } else {
      res.status(400).json({ message: "Pool does not exist" });
    }
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
