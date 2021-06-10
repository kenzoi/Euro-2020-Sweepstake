/* eslint-disable global-require */
module.exports = {
  up: async (queryInterface) => {
    const matches = require("../mockApiData/matches.json");
    const arr = matches.map((el) => ({
      ...el,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    return queryInterface.bulkInsert("matches", arr);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("matches", null);
  },
};
