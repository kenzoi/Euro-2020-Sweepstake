const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./router");
const db = require("./models/pg");

require("dotenv").config();

const app = express();

(async () => {
  await db.sequelize.sync();
})();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(router);

module.exports = app;
