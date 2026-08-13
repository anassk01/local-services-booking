const { validationResult } = require("express-validator");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
async function register(request, response) {
  const { name, email, password } = request.body;
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return response.status(409).json({ message: "email already exists" });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    return response.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "Internal server error" });
  }
}

async function login(request, response) {
  try {
    const { email, password } = request.body;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return response.status(401).json({ message: "Invalid credentials" });
    }
    const comparePassword = await user.comparePassword(password);
    if (!comparePassword) {
      return response.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id.toString());
    return response.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "internal error " });
  }
}
async function getMe(request, response) {
  return response.status(200).json({
    user: {
      id: request.user.id,
      name: request.user.name,
      email: request.user.email,
      role: request.user.role,
    },
  });
}
module.exports = { register, login, getMe };
