const express = require("express");
const adminOnly = require("../middleware/adminMiddleware");
const {
  getAllUsers,
  getUser,
  deleteUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const { param } = require("express-validator");
const router = express.Router();
const idRule = [param("id").isMongoId().withMessage("invalid id")];
router.get("/", protect, adminOnly, getAllUsers);
router.get("/:id", protect, adminOnly, idRule, getUser);
router.delete("/:id", protect, adminOnly, idRule, deleteUser);

module.exports = router;
