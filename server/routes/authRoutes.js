const express = require("express");
const { register, login, getMe } = require("../controllers/authController");
const router = express.Router();
const { body } = require("express-validator");
const protect = require("../middleware/authMiddleware");
const registerRules = [
  body("name").trim().notEmpty().withMessage("name is required"),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("enter at least 6 charcter password"),
];

const loginRules = [
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("enter a valid email"),
  body("password").notEmpty().withMessage("password required"),
];
router.post("/register", registerRules, register);
router.post("/login", loginRules, login);
router.get("/me", protect, getMe);
module.exports = router;
