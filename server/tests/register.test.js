const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/User");
const handler = require("../app");
const request = require("supertest");

let memoryServer;

beforeAll(async () => {
  memoryServer = await MongoMemoryServer.create();
  const uri = memoryServer.getUri();
  await mongoose.connect(uri);
});

test("register", async () => {
  const payload = { name: "user", email: "user@mail.com", password: "user123" };
  const response = await request(handler)
    .post("/api/auth/register")
    .send(payload);
  expect(response.status).toBe(201);
  expect(response.body.user).toMatchObject({
    name: payload.name,
    email: payload.email,
    role: "user",
  });
  expect(response.body.user.id).toBeDefined();
  expect(response.body.user.password).toBeUndefined();
  const record = await User.findOne({ email: payload.email }).select(
    "+password",
  );
  expect(record).not.toBeNull();
  expect(record.password).not.toBe(payload.password);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await memoryServer.stop();
});
