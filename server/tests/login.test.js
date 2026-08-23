const User = require("../models/User");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
process.env.JWT_SECRET = "test-only-secret";
const handler = require("../app");
const { login } = require("../controllers/authController");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

test("login", async () => {
  const payload = { email: "user@mail.com", password: "user123" };
  const user = { ...payload, name: "user" };

  const record = await User.create(user);
  const response = await request(handler).post("/api/auth/login").send(payload);
  expect(response.status).toBe(200);
  expect(typeof response.body.token).toBe("string");
  expect(response.body.user.id).toBe(record._id.toString());
  expect(response.body.user).toMatchObject({
    name: user.name,
    email: user.email,
    role: "user",
  });
  expect(response.body.user.password).toBeUndefined();
});

test("invalid credentiels", async () => {
  const payload = { email: "invalid@mail.com", password: "invalidPassword" };
  const response = await request(handler).post("/api/auth/login").send(payload);
  expect(response.status).toBe(401);
  expect(response.body).toEqual({ message: "Invalid credentials" });
  expect(response.body.token).toBeUndefined();
});

test("createAccount & invalidCredentiels", async () => {
  const user = { email: "user1@mail.com", password: "user123", name: "user" };
  const invalidPayload = {
    email: "user1@mail.com",
    password: "invalidPassword",
  };

  await User.create(user);
  const response = await request(handler)
    .post("/api/auth/login")
    .send(invalidPayload);
  expect(response.status).toBe(401);
  expect(response.body).toEqual({ message: "Invalid credentials" });
  expect(response.body.token).toBeUndefined();
});

test("userToAdmin Authorization ", async () => {
  const payload = { email: "user@mail.com", password: "user123" };
  const user = { ...payload, name: "user" };
  await User.create(user);
  const login = await request(handler).post("/api/auth/login").send(payload);
  const response = await request(handler)
    .get("/api/users")
    .set("Authorization", `Bearer ${login.body.token}`);
  expect(response.status).toBe(403);
  expect(response.body).toEqual({ message: "Access forbidden" });
});
afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
