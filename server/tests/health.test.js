const request = require("supertest");
const handler = require("../app");

test("health", async () => {
  const response = await request(handler).get("/api/health");
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ message: "server is running and healthy" });
});
