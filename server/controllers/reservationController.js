const { validationResult } = require("express-validator");
const Service = require("../models/Service");
const Reservation = require("../models/Reservation");

async function createReservation(request, response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    const { service, date, time } = request.body;
    const user = request.user._id;
    const existingService = await Service.findById(service);
    if (!existingService) {
      return response.status(404).json({ message: "service not found" });
    }
    if (new Date(date).getTime() < Date.now()) {
      return response
        .status(400)
        .json({ message: "date should be in the future" });
    }

    const duplicateReservation = await Reservation.findOne({
      service: service,
      date: date,
      time: time,
      status: { $ne: "cancelled" },
    });
    if (duplicateReservation) {
      return response.status(409).json({ message: "Time slot already booked" });
    }
    const reservation = await Reservation.create({
      user,
      service,
      date,
      time,
    });
    return response.status(201).json({ reservation });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "internal server error" });
  }
}

async function getReservations(request, response) {
  try {
    const user = request.user._id;
    const reservations = await Reservation.find({ user })
      .populate("service")
      .sort({ createdAt: -1 });

    return response.status(200).json({ reservations });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "internal server error" });
  }
}
async function getAllReservation(request, response) {
  try {
    const reservations = await Reservation.find({})
      .populate("user", "name email")
      .populate("service")
      .sort({ createdAt: -1 });
    return response.status(200).json({ reservations });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "internal server error" });
  }
}

async function updateReservationStatus(request, response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = request.params;
    const { status } = request.body;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return response.status(404).json({ message: "reservation not found" });
    }
    reservation.status = status;
    await reservation.save();
    return response.status(200).json({ reservation });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "internal server error" });
  }
}

async function deleteReservation(request, response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = request.params;
    const user = request.user;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return response.status(404).json({ message: "reservation not found" });
    }

    if (
      reservation.user.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      return response.status(403).json({ message: "unauthorized action" });
    }
    await reservation.deleteOne();
    return response.status(200).json({ reservation });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "internal server error" });
  }
}
module.exports = {
  createReservation,
  getReservations,
  getAllReservation,
  updateReservationStatus,
  deleteReservation,
};
