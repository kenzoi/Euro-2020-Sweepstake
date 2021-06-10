const axios = require("axios").default;

const options = {
  method: "GET",
  url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
  params: {
    league: "4",
    from: "2021-06-10",
    to: "2021-07-31",
    season: "2020",
  },
  headers: {
    "x-rapidapi-key": process.env.API_KEY,
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
  },
};

const getFixtures = async () => {
  const response = await axios.request(options);
  // eslint-disable-next-line no-console
  console.log("API CALL!!!");
  return response.data;
};

module.exports = {
  getFixtures,
};
