const Reservation = require("../models/Reservation");
const Service = require("../models/Service");
const Category = require("../models/Category");
const User = require("../models/User");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
process.env.JWT_SECRET = "testing_Secret";
const handler = require("../app");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

test("createReservation", async () => {
  const payload = { email: "user@mail.com", password: "user123" };
  const userData = { ...payload, name: "user" };

  await User.create(userData);
  const category = await Category.create({ name: "category" });
  const service = await Service.create({
    title: "service",
    description: "serviceCategory",
    price: 100,
    city: "rabat",
    category: category._id,
  });
  const loggedUser = await request(handler)
    .post("/api/auth/login")
    .send(payload);

  const reservation = await request(handler)
    .post("/api/reservations")
    .send({ service: service._id, date: "2099-12-31", time: "10:00" })
    .set({ Authorization: `Bearer ${loggedUser.body.token}` });

  const duplicateReservation = await request(handler)
    .post("/api/reservations")
    .send({ service: service._id, date: "2099-12-31", time: "10:00" })
    .set({ Authorization: `Bearer ${loggedUser.body.token}` });

  expect(reservation.status).toBe(201);
  expect(reservation.body.reservation.status).toBe("pending");
  expect(reservation.body.reservation.service).toBe(service._id.toString());
  expect(reservation.body.reservation.time).toBe("10:00");
  expect(duplicateReservation.status).toBe(409);
  expect(duplicateReservation.body).toEqual({
    message: "Time slot already booked",
  });
  const countReservations = await Reservation.countDocuments({});
  expect(countReservations).toBe(1);
});

afterEach(async () => {
  await Reservation.deleteMany({});
  await Service.deleteMany({});
  await Category.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
