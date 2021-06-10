const { Router } = require("express");
const userController = require("./controllers/user");
const poolController = require("./controllers/pool");
const matchController = require("./controllers/match");
const resultController = require("./controllers/result");

const router = new Router();

router.post("/user", userController.createUser);

router.post("/pool", poolController.createPool);
router.get("/pool", poolController.getPools);
router.post("/pool/:nanoId", poolController.joinPool);

router.get("/matches", matchController.getMatches);

router.get("/result", resultController.getResults);

module.exports = router;
