const _ = require("lodash");

const matchesJSON = (data) => {
  const matches = [];
  data.forEach((match) => {
    matches.push({
      id: match.fixture.id,
      homeTeamId: match.teams.home.id,
      awayTeamId: match.teams.away.id,
      kickoff: match.fixture.date,
    });
  });
  return JSON.stringify(matches);
};

const teamsJSON = (data) => {
  const teams = [];
  data.forEach((match) => {
    const homeTeam = {
      id: match.teams.home.id,
      name: match.teams.home.name,
    };
    teams.push(homeTeam);
    const awayTeam = {
      id: match.teams.away.id,
      name: match.teams.away.name,
    };
    teams.push(awayTeam);
  });
  return JSON.stringify(_.uniqBy(teams, "id"));
};

module.exports = {
  matchesJSON,
  teamsJSON,
};
