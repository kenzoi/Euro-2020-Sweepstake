const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./router");
const db = require("./models/pg");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(router);

(async () => {
  await db.sequelize.sync();
  app.listen(process.env.EXPRESS_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on http://localhost:${process.env.EXPRESS_PORT}`);
  });
})();
