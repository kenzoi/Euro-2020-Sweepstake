const sequelize = require("sequelize");
const db = require("../models/pg");

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await db.prediction.findAll({
      attributes: [
        "poolId",
        "userId",
        [sequelize.fn("COUNT", sequelize.col("pointsScored")), "totalPoints"],
      ],
      group: ["poolId", "userId"],
    });
    res.status(200).json(leaderboard);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  getLeaderboard,
};
