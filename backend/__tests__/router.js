const request = require("supertest");
const app = require("../app");
const loginController = require("../controllers/login");
const userController = require("../controllers/user");
const poolController = require("../controllers/pool");
const matchController = require("../controllers/match");
const resultController = require("../controllers/result");
const predictionController = require("../controllers/prediction");
const leaderboardController = require("../controllers/leaderboard");

jest.mock("../controllers/login");
jest.mock("../controllers/user");
jest.mock("../controllers/pool");
jest.mock("../controllers/match");
jest.mock("../controllers/result");
jest.mock("../controllers/prediction");
jest.mock("../controllers/leaderboard");

describe("/login/:email (POST)", () => {
  test("It should call loginController.login once", async () => {
    loginController.login.mockImplementation((req, res) => res.end());
    await request(app).post("/login/:email");
    expect(loginController.login).toHaveBeenCalledTimes(1);
  });
});

describe("/user (POST)", () => {
  test("It should call userController.createUser once", async () => {
    userController.createUser.mockImplementation((req, res) => res.end());
    await request(app).post("/user");
    expect(userController.createUser).toHaveBeenCalledTimes(1);
  });
});

describe("/pool/user/:userId (POST)", () => {
  test("It should call poolController.createPool (POST) once", async () => {
    poolController.createPool.mockImplementation((req, res) => res.end());
    await request(app).post("/pool/user/:userId");
    expect(poolController.createPool).toHaveBeenCalledTimes(1);
  });
});

describe("/pool/user/:userId (GET)", () => {
  test("It should call poolController.getPools (GET) once", async () => {
    poolController.getPools.mockImplementation((req, res) => res.end());
    await request(app).get("/pool/user/:userId");
    expect(poolController.getPools).toHaveBeenCalledTimes(1);
  });
});

describe("/pool/:nanoId/user/:userId (POST)", () => {
  test("It should call poolController.joinPool once", async () => {
    poolController.joinPool.mockImplementation((req, res) => res.end());
    await request(app).post("/pool/:nanoId/user/:userId");
    expect(poolController.joinPool).toHaveBeenCalledTimes(1);
  });
});

describe("/match (GET)", () => {
  test("It should call matchController.getMatches once", async () => {
    matchController.getMatches.mockImplementation((req, res) => res.end());
    await request(app).get("/match");
    expect(matchController.getMatches).toHaveBeenCalledTimes(1);
  });
});

describe("/result (GET)", () => {
  test("It should call matchController.getMatches once", async () => {
    resultController.getResults.mockImplementation((req, res) => res.end());
    await request(app).get("/result");
    expect(resultController.getResults).toHaveBeenCalledTimes(1);
  });
});

describe("/prediction/:poolId/user/:userId (POST)", () => {
  test("It should call predictionController.addPredictions once", async () => {
    predictionController.addPredictions.mockImplementation((req, res) =>
      res.end()
    );
    await request(app).post("/prediction/:poolId/user/:userId");
    expect(predictionController.addPredictions).toHaveBeenCalledTimes(1);
  });
});

describe("/prediction/:poolId/user/:userId (PUT)", () => {
  test("It should call predictionController.addPredictions once", async () => {
    predictionController.updatePredictions.mockImplementation((req, res) =>
      res.end()
    );
    await request(app).put("/prediction/:poolId/user/:userId");
    expect(predictionController.updatePredictions).toHaveBeenCalledTimes(1);
  });
});

describe("/prediction/:poolId/user/:userId (GET)", () => {
  test("It should call predictionController.getPredictions once", async () => {
    predictionController.getPredictions.mockImplementation((req, res) =>
      res.end()
    );
    await request(app).get("/prediction/:poolId/user/:userId");
    expect(predictionController.getPredictions).toHaveBeenCalledTimes(1);
  });
});

describe("/leaderboard/:nanoId", () => {
  test("It should call leaderboardController.getLeaderboard once", async () => {
    leaderboardController.getLeaderboard.mockImplementation((req, res) =>
      res.end()
    );
    await request(app).get("/leaderboard/:nanoId");
    expect(leaderboardController.getLeaderboard).toHaveBeenCalledTimes(1);
  });
});

// test("It should respond with an array", async () => {
//   const response = await request(app).get("/pool/user/1");
//   expect(response.body).toEqual(
//     expect.objectContaining({ pools: expect.any(Array) })
//   );
// });
