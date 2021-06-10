const _ = require("lodash");
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
  data.forEach((result) => {
    arr.push({
      id: result.fixture.id,
      homeScore: result.goals.home,
      awayScore: result.goals.away,
      matchId: result.fixture.id,
    });
  });
  return arr;
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
    fields: ["id", "homeScore", "awayScore"],
    updateOnDuplicate: ["id", "homeScore", "awayScore", "updatedAt"],
  });
};

module.exports = {
  matches,
  teams,
  dbUpsert,
};
