const _ = require("lodash");
const { Op } = require("sequelize");
const db = require("./models/pg");

const teams = (data) => {
  const arr = [];
  data.forEach((match) => {
    const homeTeam = {
      id: match.teams.home.id,
      name: match.teams.home.name,
    };
    arr.push(homeTeam);
    const awayTeam = {
      id: match.teams.away.id,
      name: match.teams.away.name,
    };
    arr.push(awayTeam);
  });
  return _.uniqBy(arr, "id");
};

const matches = (data) => {
  const arr = [];
  data.forEach((match) => {
    arr.push({
      id: match.fixture.id,
      homeTeamId: match.teams.home.id,
      awayTeamId: match.teams.away.id,
      kickoff: match.fixture.date,
    });
  });
  return arr;
};

const results = (data) => {
  const arr = [];
  data.forEach(
    (result) => {
      // TODO: add logic to only update results on "FT" "AET" "PEN" status'
      // if (result.status.short === "FT") {
      arr.push({
        id: result.fixture.id,
        homeScore: result.goals.home,
        awayScore: result.goals.away,
        matchId: result.fixture.id,
      });
    }
    // }
  );
  return arr;
};

const addScores = async (data) => {
  const matchesWithScores = data.filter(
    (match) => match.homeScore !== null && match.awayScore !== null
  );

  const dbMatchIds = matchesWithScores.map((match) => match.id);

  const predictionsToAddScores = await db.prediction.findAll({
    where: { matchId: dbMatchIds },
  });

  const rowsToAddPoints = _.flattenDeep(
    predictionsToAddScores.map((prediction) =>
      // eslint-disable-next-line array-callback-return, consistent-return
      matchesWithScores.map((match) => {
        if (
          match.id === prediction.matchId &&
          match.homeScore === prediction.homeScore &&
          match.awayScore === prediction.awayScore
        )
          return prediction.id;
      })
    )
  ).filter((item) => item !== undefined);

  await db.prediction.update(
    {
      pointsScored: 1,
    },
    {
      where: { id: { [Op.in]: rowsToAddPoints } },
    }
  );
};

const dbUpsert = async (data) => {
  const teamData = teams(data);
  await db.team.bulkCreate(teamData, {
    fields: ["id", "name"],
    updateOnDuplicate: ["id", "name", "updatedAt"],
  });

  const matchData = matches(data);
  db.match.bulkCreate(matchData, {
    fields: ["id", "kickoff", "homeTeamId", "awayTeamId"],
    updateOnDuplicate: ["id", "name", "kickoff", "homeTeamId", "updatedAt"],
  });

  const resultData = results(data);
  db.result.bulkCreate(resultData, {
    fields: ["id", "homeScore", "awayScore", "matchId"],
    updateOnDuplicate: ["id", "homeScore", "awayScore", "matchId", "updatedAt"],
  });

  addScores(resultData);
};

module.exports = {
  matches,
  teams,
  dbUpsert,
};
