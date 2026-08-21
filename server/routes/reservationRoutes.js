const express = require("express");
const { body, param } = require("express-validator");
const protect = require("../middleware/authMiddleware");
const {
  createReservation,
  getReservations,
  getAllReservation,
  updateReservationStatus,
  deleteReservation,
} = require("../controllers/reservationController");
const adminOnly = require("../middleware/adminMiddleware");
const router = express.Router();
const rules = [
  body("service").isMongoId().withMessage("provide a valid Id "),
  body("date")
    .isISO8601({ strict: true })
    .withMessage("invalid date format")
    .toDate(),
  body("time")
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/)
    .withMessage("invalid time format"),
];

const updateStatusRules = [
  param("id").isMongoId().withMessage("invalid mongo id"),
  body("status").isIn(["pending", "confirmed", "completed", "cancelled"]),
];

const isMongoIdRule = [param("id").isMongoId().withMessage("id not valid")];

router.post("/", protect, rules, createReservation);
router.get("/my", protect, getReservations);
router.get("/", protect, adminOnly, getAllReservation);
router.put(
  "/:id/status",
  protect,
  adminOnly,
  updateStatusRules,
  updateReservationStatus,
);

router.delete("/:id", protect, isMongoIdRule, deleteReservation);
module.exports = router;
