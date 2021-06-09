/* eslint-disable global-require */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const teams = require("../mockApiData/teams.json");
    const arr = teams.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    return queryInterface.bulkInsert("teams", arr);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("teams", null);
  },
};
