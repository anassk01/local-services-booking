const express = require("express");
const { body, param } = require("express-validator");
const adminOnly = require("../middleware/adminMiddleware");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
const categoryRules = [
  body("name").trim().notEmpty().withMessage("Name required"),
];

const updateCategoryRules = [
  body("name").trim().notEmpty().withMessage("Name required"),
  param("id").isMongoId().withMessage("invalid record Id"),
];

const deleteCategoryRules = [
  param("id").isMongoId().withMessage("invalid record Id"),
];

router.get("/", getCategories);
router.post("/", protect, adminOnly, categoryRules, createCategory);
router.put("/:id", protect, adminOnly, updateCategoryRules, updateCategory);
router.delete("/:id", protect, adminOnly, deleteCategoryRules, deleteCategory);

module.exports = router;
