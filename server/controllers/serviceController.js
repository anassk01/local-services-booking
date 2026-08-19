const { validationResult } = require("express-validator");
const Category = require("../models/Category");
const Service = require("../models/Service");

async function createService(request, response) {
  try {
    const { title, description, city, price, image, category } = request.body;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const currentCategory = await Category.exists({
      _id: category,
    });
    if (!currentCategory) {
      return response.status(404).json({ message: "Category not found" });
    }
    const service = await Service.create({
      title,
      description,
      city,
      price,
      category,
      image,
    });
    await service.populate("category", "name");
    return response.status(201).json({ service });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "internal server error" });
  }
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function getServices(request, response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    const filter = {};
    const { search, city, category, minPrice, maxPrice } = request.query;
    if (search) {
      filter.title = {
        $regex: escapeRegex(search),
        $options: "i",
      };
    }
    if (city) {
      filter.city = {
        $regex: `^${escapeRegex(city)}$`,
        $options: "i",
      };
    }
    if (category) {
      filter.category = category;
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) {
        filter.price.$gte = minPrice;
      }
      if (maxPrice !== undefined) {
        filter.price.$lte = maxPrice;
      }
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      if (minPrice > maxPrice) {
        return response
          .status(400)
          .json({ message: "minPrice cannot be greater than maxPrice" });
      }
    }

    const services = await Service.find(filter)
      .populate("category", "name")
      .sort({
        createdAt: -1,
      });
    return response.status(200).json({ services });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "internal server error " });
  }
}
async function getServiceById(request, response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const { id } = request.params;
    const service = await Service.findById(id).populate("category", "name");
    if (!service) {
      return response.status(404).json({ message: "no service found" });
    }
    return response.status(200).json({ service });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "internal server error" });
  }
}
async function updateService(request, response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = request.params;
    const service = await Service.findById(id);
    if (!service) {
      return response.status(404).json({ message: "service not found" });
    }
    const { title, description, city, price, category, image } = request.body;
    if (category) {
      const existingCategory = await Category.exists({
        _id: category,
      });
      if (!existingCategory) {
        return response.status(404).json({ message: "category not found" });
      }
    }
    service.title = title;
    service.description = description;
    service.city = city;
    service.price = price;
    service.category = category;
    service.image = image;
    await service.save();
    await service.populate("category", "name");
    return response.status(200).json({ service });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "internal server error" });
  }
}

async function deleteService(request, response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = request.params;
    const service = await Service.findById(id);
    if (!service) {
      return response.status(404).json({ message: "service not found" });
    }
    await service.deleteOne();
    return response.status(200).json({ message: "service deleted" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "internal server error" });
  }
}
module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
