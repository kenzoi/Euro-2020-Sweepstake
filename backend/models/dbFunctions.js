const db = require("./index");

// find matches
const findMatches = async () => {
  try {
    const data = await db.match.findAll({
      attributes: ["id", "kickoff"],
      include: [
        { model: db.team, attributes: ["name"], as: "homeTeam" },
        { model: db.team, attributes: ["name"], as: "awayTeam" },
      ],
    });
    console.log("data:", JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

// create users
const createUser = async () => {
  try {
    const user = await db.user.create({
      email: "test@example.com",
      name: "JB",
    });
    console.log(user);
  } catch (e) {
    console.log(e);
  }
};

// create pool and assocaite user/owner
const createPool = async () => {
  try {
    const user = await db.user.findOne({
      where: { email: "test@example.com" },
    });
    const pool = await db.pool.create({
      nanoId: "testid",
    });
    console.log("pool:", pool);
    const thing = await pool.addUser(user, { through: { owner: true } });
    console.log("thing:", thing);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  findMatches,
  createUser,
  createPool,
};
