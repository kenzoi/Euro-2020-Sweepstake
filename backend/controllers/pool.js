const { nanoid } = require("nanoid");
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
    // TODO: Not so DRY...
    const pools = await db.user.findOne({
      where: { id: userId },
      attributes: [],
      include: {
        // TODO: see if there is a better way to include the pool owner
        model: db.pool,
        attributes: ["id", "nanoId"],
        include: {
          model: db.prediction,
          required: false,
          attributes: ["id", "homeScore", "awayScore"],
          where: { userId },
          include: {
            model: db.match,
            attributes: ["id", "kickoff"],
            as: "match",
            include: [
              { model: db.team, attributes: ["name"], as: "homeTeam" },
              { model: db.team, attributes: ["name"], as: "awayTeam" },
            ],
          },
        },
      },
    });
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
    // TODO: Not so DRY...
    const pools = await db.user.findOne({
      where: { id: userId },
      attributes: [],
      include: {
        // TODO: see if there is a better way to include the pool owner
        model: db.pool,
        attributes: ["id", "nanoId"],
        include: {
          model: db.prediction,
          required: false,
          attributes: ["id", "homeScore", "awayScore"],
          where: { userId },
          include: {
            model: db.match,
            attributes: ["id", "kickoff"],
            as: "match",
            include: [
              { model: db.team, attributes: ["name"], as: "homeTeam" },
              { model: db.team, attributes: ["name"], as: "awayTeam" },
            ],
          },
        },
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
    // TODO: get userId from auth middleware instead of params
    const { nanoId, userId } = req.params;
    const user = await db.user.findOne({
      where: { id: userId },
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
