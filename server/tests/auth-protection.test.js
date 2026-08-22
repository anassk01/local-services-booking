const request = require("supertest");
const handler = require("../app");

test("authentication middleware", async () => {
  const response = await request(handler).get("/api/users");
  expect(response.status).toBe(401);
  expect(response.body).toEqual({ message: "authentication required" });
});
