import Phone from "../models/phone.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ADD BRAND + MODELS
export const addBrand = asyncHandler(async (req, res) => {
  const { brand, models } = req.body;

  if (!brand || !models || !Array.isArray(models) || models.length === 0) {
    throw new ApiError(400, "Brand and at least one model are required");
  }

  const exists = await Phone.findOne({ brand });
  if (exists) {
    throw new ApiError(400, "Brand already exists");
  }

  const saved = await Phone.create({ brand, models });

  res
    .status(201)
    .json(new ApiResponse(201, saved, "Brand added successfully"));
});

// GET ALL BRANDS
export const getAllBrands = asyncHandler(async (req, res) => {
  const brands = await Phone.find({}, { brand: 1, _id: 1 }).sort({ brand: 1 });

  res
    .status(200)
    .json(new ApiResponse(200, brands, "Brands retrieved successfully"));
});

// GET MODELS BY BRAND
export const getModelsByBrand = asyncHandler(async (req, res) => {
  const { brand } = req.params;

  const data = await Phone.findOne({ brand });

  if (!data) {
    throw new ApiError(404, "Brand not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, data, "Models retrieved successfully"));
});

// UPDATE MODELS OF BRAND
export const updateModelsByBrand = asyncHandler(async (req, res) => {
  const { brand } = req.params;
  const { models } = req.body;

  if (!models || !Array.isArray(models) || models.length === 0) {
    throw new ApiError(400, "At least one model is required");
  }

  const updated = await Phone.findOneAndUpdate(
    { brand },
    { models },
    { new: true, runValidators: true }
  );

  if (!updated) {
    throw new ApiError(404, "Brand not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updated, "Models updated successfully"));
});

// DELETE BRAND
export const deleteBrand = asyncHandler(async (req, res) => {
  const { brand } = req.params;

  const deleted = await Phone.findOneAndDelete({ brand });

  if (!deleted) {
    throw new ApiError(404, "Brand not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Brand deleted successfully"));
});
