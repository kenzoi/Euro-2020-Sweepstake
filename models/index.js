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

const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Pool = sequelize.define("pool", {});

const Prediction = sequelize.define("prediction", {
  homeScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Team.hasMany(Match, { foreignKey: "homeTeamId" });
Team.hasMany(Match, { foreignKey: "awayTeamId" });
Match.belongsTo(Team, { as: "homeTeam" });
Match.belongsTo(Team, { as: "awayTeam" });

Team.hasMany(Prediction, { foreignKey: "homeTeamId" });
Team.hasMany(Prediction, { foreignKey: "awayTeamId" });
Prediction.belongsTo(Team, { as: "homeTeam" });
Prediction.belongsTo(Team, { as: "awayTeam" });

Match.hasOne(Result);
Result.belongsTo(Match, { as: "match" });

Match.hasMany(Prediction);
Prediction.belongsTo(Match, { as: "match" });

User.hasMany(Prediction);
Prediction.belongsTo(User, { as: "user" });

Pool.hasMany(Prediction);
Prediction.belongsTo(Pool, { as: "pool" });

User.hasOne(Pool, { foreignKey: "ownerId" });
Pool.belongsTo(User, { as: "owner" });

// eslint-disable-next-line camelcase
const User_Pool = sequelize.define("user_pool", {}, { timestamps: false });
User.belongsToMany(Pool, { through: User_Pool });
Pool.belongsToMany(User, { through: User_Pool });

db[Team.name] = Team;
db[Match.name] = Match;
db[Result.name] = Result;
db[User.name] = User;
db[Prediction.name] = Prediction;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
