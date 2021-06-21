const { Sequelize, DataTypes } = require("sequelize");

const environment =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
require("dotenv").config({ path: environment });

const db = {};

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: "localhost",
    port: process.env.POSTGRES_PORT,
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
    allowNull: true,
  },
  awayScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
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

const Pool = sequelize.define("pool", {
  nanoId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// eslint-disable-next-line camelcase
const User_Pool = sequelize.define(
  "user_pool",
  {
    owner: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { timestamps: false }
);

const Prediction = sequelize.define("prediction", {
  homeScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  awayScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  pointsScored: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

Team.hasMany(Match, { foreignKey: "homeTeamId" });
Team.hasMany(Match, { foreignKey: "awayTeamId" });
Match.belongsTo(Team, { as: "homeTeam", foreignKey: { allowNull: false } });
Match.belongsTo(Team, { as: "awayTeam", foreignKey: { allowNull: false } });

Match.hasOne(Result);
Result.belongsTo(Match, { as: "match", foreignKey: { allowNull: false } });

Match.hasMany(Prediction);
Prediction.belongsTo(Match, { as: "match", foreignKey: { allowNull: false } });

User.hasMany(Prediction);
Prediction.belongsTo(User, { as: "user", foreignKey: { allowNull: false } });

Pool.hasMany(Prediction);
Prediction.belongsTo(Pool, { as: "pool", foreignKey: { allowNull: false } });

User.belongsToMany(Pool, { through: User_Pool });
Pool.belongsToMany(User, { through: User_Pool });

db[Team.name] = Team;
db[Match.name] = Match;
db[Result.name] = Result;
db[User.name] = User;
db[Pool.name] = Pool;
// eslint-disable-next-line camelcase
db[User_Pool.name] = User_Pool;
db[Prediction.name] = Prediction;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
