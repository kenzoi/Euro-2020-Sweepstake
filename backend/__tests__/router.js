const request = require("supertest");
const app = require("../app");

describe("mock", () => {
  test("It should respond with 200", async () => {
    const response = await request(app).get("/match");
    expect(response.statusCode).toBe(200);
  });
});
