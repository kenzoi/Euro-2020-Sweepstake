// Server Integration Tests

const request = require("supertest");
const app = require("../app");

const testUser = {
  name: "testUser",
  email: "testUser@testUser.com",
  id: 4,
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
  });
});


describe("/login/:email (POST)", () => {
  test("It should return StatusCode 400 if email is not valid or found", async () => {
    const response = await request(app).post("/login/fakeEmail");
    expect(response.statusCode).toBe(400);
  });

  test("It should return StatusCode 200", async () => {
    const response = await request(app).post(`/login/${testUser.email}`);
    expect(response.statusCode).toBe(200);
  });
});

describe("/pool/user/:userId (POST)", () => {
  test("", async () => {});
});
