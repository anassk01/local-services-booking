const User = require("../models/User");
const Reservation = require("../models/Reservation");

const { validationResult } = require("express-validator");
async function getAllUsers(request, response) {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });
    return response.status(200).json({ users });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "internal server error" });
  }
}

async function getUser(request, response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = request.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return response.status(404).json({ message: "user not found" });
    }
    return response.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "internal server error" });
  }
}

async function deleteUser(request, response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = request.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return response.status(404).json({ message: "user not found" });
    }
    if (user._id.toString() === request.user._id.toString()) {
      return response
        .status(400)
        .json({ message: "cannot delete your own account" });
    }
    const hasReservation = await Reservation.exists({ user: id });
    if (hasReservation) {
      return response
        .status(409)
        .json({ message: "operation conflicts with existing data" });
    }
    await user.deleteOne();
    return response.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "internal server error" });
  }
}

module.exports = { getAllUsers, getUser, deleteUser };
