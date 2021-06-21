const app = require("./app");

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Listening on http://localhost:${process.env.EXPRESS_PORT}`);
});
