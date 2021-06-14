const { Router } = require("express");
const userController = require("./controllers/user");
const poolController = require("./controllers/pool");
const matchController = require("./controllers/match");
const resultController = require("./controllers/result");
const loginController = require("./controllers/login");
const predictionController = require("./controllers/prediction");
const leaderboardController = require("./controllers/leaderboard");

const router = new Router();

router.post("/login", loginController.login);

router.post("/user", userController.createUser);

router.post("/pool/user/:userId", poolController.createPool);
router.get("/pool/user/:userId", poolController.getPools);
router.post("/pool/:nanoId/user/:userId", poolController.joinPool);

router.get("/match", matchController.getMatches);

router.get("/result", resultController.getResults);

router.post(
  "/prediction/:poolId/user/:userId",
  predictionController.addPredictions
);
router.put(
  "/prediction/:poolId/user/:userId",
  predictionController.updatePredictions
);
router.get(
  "/prediction/:poolId/user/:userId",
  predictionController.getPredictions
);

router.get("/leaderboard/:nanoId", leaderboardController.getLeaderboard);

module.exports = router;
