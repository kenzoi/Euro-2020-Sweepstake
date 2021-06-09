const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const db = {};

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const Team = sequelize.define("team", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Match = sequelize.define("match", {
  kickoff: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

const Result = sequelize.define("result", {
  homeScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Match.belongsTo(Team, { as: "homeTeam" });
Match.belongsTo(Team, { as: "awayTeam" });

Result.belongsTo(Match, { as: "match" });
Result.belongsTo(Team, { as: "homeTeam" });
Result.belongsTo(Team, { as: "awayTeam" });

db[Team.name] = Team;
db[Match.name] = Match;
db[Result.name] = Result;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
