import Part from "../models/part.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ADD NEW PART
export const addPart = asyncHandler(async (req, res) => {
  const { brand, model, partName, type, price, stock } = req.body;

  if (!brand || !model || !partName || !type || price === undefined || stock === undefined) {
    throw new ApiError(400, "All fields are required");
  }

  const exists = await Part.findOne({ brand, model, partName, type });
  if (exists) {
    throw new ApiError(400, "This part already exists");
  }

  const saved = await Part.create({
    brand,
    model,
    partName,
    type,
    price,
    stock,
  });

  res
    .status(201)
    .json(new ApiResponse(201, saved, "Part added successfully"));
});

// GET ALL PARTS
export const getAllParts = asyncHandler(async (req, res) => {
  const parts = await Part.find().sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, parts, "Parts retrieved successfully"));
});

// GET PARTS BY BRAND + MODEL
export const getPartsByBrandModel = asyncHandler(async (req, res) => {
  const { brand, model } = req.params;

  const parts = await Part.find({ brand, model });

  if (!parts || parts.length === 0) {
    throw new ApiError(404, "No parts found for this brand and model");
  }

  res
    .status(200)
    .json(new ApiResponse(200, parts, "Parts retrieved successfully"));
});

// UPDATE PART
export const updatePart = asyncHandler(async (req, res) => {
  const updated = await Part.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updated) {
    throw new ApiError(404, "Part not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updated, "Part updated successfully"));
});

// DELETE PART
export const deletePart = asyncHandler(async (req, res) => {
  const deleted = await Part.findByIdAndDelete(req.params.id);

  if (!deleted) {
    throw new ApiError(404, "Part not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Part deleted successfully"));
});
