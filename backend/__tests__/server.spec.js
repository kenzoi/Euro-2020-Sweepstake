// Server Integration Tests

const request = require("supertest");
const app = require("../app");

const testUser = {
  name: "testUser",
  email: "testUser@testUser.com",
};

describe("/user (POST)", () => {
  // TODO TEST NEW USER AFTER IMPLEMENT DELETE USER
  test("It should return 400 if no email or name is provided", async () => {
    const response = await request(app).post("/user");
    expect(response.statusCode).toBe(400);
  });
});

describe("/login/:email (POST)", () => {
  test("It should return 400 with email is not valid or found", async () => {
    const response = await request(app).post("/login/fakeEmail");
    expect(response.statusCode).toBe(400);
  });

  test("It should return 400 with email is not valid or found", async () => {
    const response = await request(app).post(`/login/${testUser.email}`);
    expect(response.statusCode).toBe(200);
  });
});
