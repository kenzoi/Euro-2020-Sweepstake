const app = require("./app");

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Listening on http://localhost:${process.env.EXPRESS_PORT}`);
});

// (async () => {
//   await db.sequelize.sync();
//   app.listen(process.env.EXPRESS_PORT, () => {
//     // eslint-disable-next-line no-console
//     console.log(`Listening on http://localhost:${process.env.EXPRESS_PORT}`);
//   });
// })();
