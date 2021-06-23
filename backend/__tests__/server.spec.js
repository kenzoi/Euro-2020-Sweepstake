// Server Integration Tests

const request = require("supertest");
const app = require("../app");

const mockUser = {
  name: "testUser",
  email: "testUser@testUser.com",
  id: "",
};

const mockPool = {
  nanoId: "",
};

describe("/user (POST)", () => {
  test("It should return StatusCode 400 if no email or name is provided", async () => {
    const response = await request(app).post("/user");
    expect(response.statusCode).toBe(400);
  });

  test("It should create an user and return the new created user", async () => {
    const response = await request(app)
      .post("/user")
      .send({ name: "test", email: "test@test.com" });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    mockUser.id = response.body.id; // Store the user Id to be used in the nexts tests
  });
});

describe("/login/:email (POST)", () => {
  test("It should return StatusCode 400 if email is not valid or found", async () => {
    const response = await request(app).post("/login/fakeEmail");
    expect(response.statusCode).toBe(400);
  });

  test("It should return StatusCode 200", async () => {
    const response = await request(app).post(`/login/${mockUser.email}`);
    expect(response.statusCode).toBe(200);
  });
});

describe("/pool/user/:userId (GET)", () => {
  test("Validates that a User is created without a pool", async () => {
    const response = await request(app).get(`/pool/user/${mockUser.id}`);
    expect(response.body.pools.length).toBe(0);
  });
});

describe("/pool/user/:userId (Post)", () => {
  test("Validates that pools can be created successfully", async () => {
    const response = await request(app).post(`/pool/user/${mockUser.id}`);
    mockPool.nanoId = response.body.pools[0].nanoId; // Store the nanoId to be used in the nexts tests
    expect(response.body.pools.length).toBe(1);
  });

  test("It should return StatusCode 201", async () => {
    const response = await request(app).post(`/pool/user/${mockUser.id}`);
    expect(response.statusCode).toBe(201);
  });
});

describe("/pool/:nanoId/user/:userId (POST)", () => {
  test("It should add user to a pool", async () => {
    const poolJoinUser = await request(app)
      .post("/user")
      .send({ name: "pooljoinUser", email: "poolJoinUser@test.com" });

    const response = await request(app).post(
      `/pool/${mockPool.nanoId}/user/${poolJoinUser.body.id}`
    );
    expect(response.statusCode).toBe(200);

    await request(app).delete(`/user/${poolJoinUser.body.id}`);
  });
});

describe("/user/:userId (DELETE)", () => {
  test("It should return Bad Request 400 if provided invalid user id", async () => {
    const response = await request(app).delete(`/user/-1`);
    expect(response.statusCode).toBe(400);
  });

  test("It should delete the user", async () => {
    const response = await request(app).delete(`/user/${mockUser.id}`);
    expect(response.statusCode).toBe(204);
  });
});

describe("/match (GET)", () => {
  test("It should respond with status code 200", async () => {
    const response = await request(app).get("/match");
    expect(response.statusCode).toBe(200);
  });

  test("It should respond with the matches", async () => {
    const response = await request(app).get("/match");
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          kickoff: expect.any(String),
        }),
      ])
    );
  });
});

describe("/result (GET)", () => {
  test("It should respond with status code 200", async () => {
    const response = await request(app).get("/result");
    expect(response.statusCode).toBe(200);
  });

  test("It should respond with the matches", async () => {
    const response = await request(app).get("/result");
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          result: expect.objectContaining({
            homeScore: expect.any(Number),
            awayScore: expect.any(Number),
          }),
        }),
      ])
    );
  });
});
