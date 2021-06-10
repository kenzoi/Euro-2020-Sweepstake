const db = require("../models/pg");

const getMatches = async (req, res) => {
  try {
    const data = await db.match.findAll({
      attributes: ["id", "kickoff"],
      include: [
        { model: db.team, attributes: ["name"], as: "homeTeam" },
        { model: db.team, attributes: ["name"], as: "awayTeam" },
      ],
    });
    res.status(200).json(data);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  getMatches,
};
