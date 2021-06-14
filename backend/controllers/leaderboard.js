const sequelize = require("sequelize");
const db = require("../models/pg");

const getLeaderboard = async (req, res) => {
  try {
    const { nanoId } = req.params;
    const leaderboard = await db.prediction.findAll({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("pointsScored")), "totalPoints"],
      ],
      group: ["user.id", "pool.id"],
      include: [
        {
          model: db.pool,
          attributes: ["nanoId"],
          as: "pool",
          where: { nanoId },
        },
        { model: db.user, attributes: ["email"], as: "user" },
      ],
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
