const _ = require("lodash");
const fixtures = require("./mockApiData/fixtures.json");

// matches
const matches = [];
fixtures.response.forEach((match) => {
  matches.push({
    id: match.fixture.id,
    homeTeamId: match.teams.home.id,
    awayTeamId: match.teams.away.id,
    kickoffTimestamp: match.fixture.timestamp,
  });
});
console.log("matches:", matches);

// teams
const teams = [];
fixtures.response.forEach((match) => {
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
console.log("teams:", _.uniqBy(teams, "id"));
