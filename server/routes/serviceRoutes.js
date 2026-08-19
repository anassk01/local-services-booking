const express = require("express");
const { body, query, param } = require("express-validator");
const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const router = express.Router();

const rules = [
  body("title").trim().notEmpty().withMessage("title required"),
  body("description").trim().notEmpty().withMessage("description is required"),
  body("city").trim().notEmpty().withMessage("city is required"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("price should be a numeric value")
    .toFloat(),
  body("category").isMongoId().withMessage("invalid mongo id"),
  body("image").optional().trim(),
];
const serviceFilterRules = [
  query("search").optional().trim(),
  query("category").optional().isMongoId().withMessage("invalid category id "),
  query("city")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("city shouldnt be empty"),
  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("minimum should be zero or greater")
    .toFloat(),
  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("maxPrice should be 0 or greater")
    .toFloat(),
];

const idRule = [param("id").isMongoId().withMessage("provide a valid id")];
router.post("/", protect, adminOnly, rules, createService);
router.get("/", serviceFilterRules, getServices);
router.get("/:id", idRule, getServiceById);
router.put("/:id", protect, adminOnly, idRule, rules, updateService);
router.delete("/:id", protect, adminOnly, idRule, deleteService);

module.exports = router;
