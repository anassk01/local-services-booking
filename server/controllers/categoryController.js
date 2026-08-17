const Category = require("../models/Category");
const Service = require("../models/Service");
const { validationResult } = require("express-validator");
async function getCategories(request, response) {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return response.status(200).json({ categories });
  } catch (error) {
    console.error(error.message);

    return response.status(500).json({
      message: "Internal server error",
    });
  }
}

async function createCategory(request, response) {
  try {
    const { name } = request.body;
    const validation = validationResult(request);
    if (!validation.isEmpty()) {
      return response.status(400).json({ errors: validation.array() });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return response.status(409).json({ message: "category already exists" });
    }
    const category = await Category.create({ name });
    return response.status(201).json({ category });
  } catch (error) {
    if (error.code === 11000) {
      return response.status(409).json({ message: "Category already exists" });
    }
    console.error(error.message);
    return response.status(500).json({ message: "internal server error" });
  }
}

async function updateCategory(request, response) {
  try {
    const { id } = request.params;
    const name = request.body.name;
    const validation = validationResult(request);
    if (!validation.isEmpty()) {
      return response.status(400).json({ errors: validation.array() });
    }

    const category = await Category.findById(id);
    if (!category) {
      return response.status(404).json({ message: "category not found" });
    }
    const duplicate = await Category.findOne({ name });
    if (duplicate && duplicate._id.toString() !== id) {
      return response.status(409).json({ message: "category already exists" });
    }
    category.name = name;
    await category.save();
    return response.status(200).json({ category });
  } catch (error) {
    if (error.code === 11000) {
      return response.status(409).json({ message: "Category already exists" });
    }
    console.error(error.message);
    return response.status(500).json({ message: "internal server error" });
  }
}
async function deleteCategory(request, response) {
  try {
    const { id } = request.params;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const category = await Category.findById(id);
    if (!category) {
      return response.status(404).json({ message: "category id not found" });
    }
    const dependentService = await Service.exists({
      category: id,
    });
    if (dependentService) {
      return response
        .status(409)
        .json({ message: "category still referenced on a service" });
    }
    await category.deleteOne();
    return response.status(200).json({ message: "Category deleted" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "internal server error" });
  }
}
module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
