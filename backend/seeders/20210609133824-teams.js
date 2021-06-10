/* eslint-disable global-require */
module.exports = {
  up: async (queryInterface) => {
    const teams = require("../mockApiData/teams.json");
    const arr = teams.map((el) => ({
      ...el,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    return queryInterface.bulkInsert("teams", arr);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("teams", null);
  },
};
