const db = require("./models/index");

(async () => {
  await db.sequelize.sync({
    force: true,
  });
})();
