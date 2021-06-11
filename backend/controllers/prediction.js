const db = require("../models/pg");

const addPredictions = async (req, res) => {
  try {
    const { poolId, userId } = req.params;
    const { predictions } = req.body.data;
    const poolExists = await db.pool.findOne({ where: { nanoId: poolId } });
    if (poolExists) {
      const data = predictions.map((prediction) => ({
        ...prediction,
        userId,
        poolId: poolExists.id,
      }));
      db.prediction.bulkCreate(data, {
        fields: ["homeScore", "awayScore", "matchId", "userId", "poolId"],
      });
      res.status(200).json({ message: "Success" });
    } else {
      res.status(400).json({ message: "Pool does not exist" });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const updatePredictions = async (req, res) => {
  try {
    const { poolId, userId } = req.params;
    const { predictions } = req.body;
    const poolExists = await db.pool.findOne({ where: { nanoId: poolId } });
    if (poolExists) {
      const data = predictions.map((prediction) => ({
        ...prediction,
        userId,
        poolId: poolExists.id,
      }));
      db.prediction.bulkCreate(data, {
        fields: ["id", "homeScore", "awayScore", "matchId", "userId", "poolId"],
        updateOnDuplicate: [
          "homeScore",
          "awayScore",
          "matchId",
          "userId",
          "poolId",
          "updatedAt",
        ],
      });
      res.status(200).json({ message: "Success" });
    } else {
      res.status(400).json({ message: "Pool does not exist" });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const getPredictions = async (req, res) => {
  try {
    const { poolId, userId } = req.params;
    const data = await db.pool.findOne({
      attributes: ["nanoId"],
      where: { nanoId: poolId },
      include: {
        model: db.prediction,
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
    });
    res.status(200).json(data);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  addPredictions,
  updatePredictions,
  getPredictions,
};
