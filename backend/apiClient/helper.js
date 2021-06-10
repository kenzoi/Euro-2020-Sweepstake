const _ = require("lodash");

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

module.exports = {
  matches,
  teams,
};
