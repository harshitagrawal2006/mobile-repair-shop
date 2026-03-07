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

const saved = await Phone.create({
  brand,
  models,
});

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

export const addModel = asyncHandler(async (req, res) => {

const { brand, model, type } = req.body;

if (!brand || !model || !type) {
  throw new ApiError(400, "Brand, model and type are required");
}

let phone = await Phone.findOne({ brand });

if (!phone) {

  phone = await Phone.create({
    brand,
    models: [{ model, type }]
  });

} else {

  const exists = phone.models.find(m => m.model === model);

  if (exists) {
    throw new ApiError(400, "Model already exists");
  }

  phone.models.push({ model, type });

  await phone.save();
}

res
.status(201)
.json(new ApiResponse(201, phone, "Model added successfully"));

});

export const updateModel = asyncHandler(async (req, res) => {

const { brand, model } = req.params;
const { newModel, type } = req.body;

const phone = await Phone.findOne({ brand });

if (!phone) {
  throw new ApiError(404, "Brand not found");
}

const modelIndex = phone.models.findIndex(m => m.model === model);

if (modelIndex === -1) {
  throw new ApiError(404, "Model not found");
}

phone.models[modelIndex].model = newModel || phone.models[modelIndex].model;
phone.models[modelIndex].type = type || phone.models[modelIndex].type;

await phone.save();

res
.status(200)
.json(new ApiResponse(200, phone, "Model updated successfully"));

});

export const deleteModel = asyncHandler(async (req, res) => {

const { brand, model } = req.params;

const phone = await Phone.findOne({ brand });

if (!phone) {
  throw new ApiError(404, "Brand not found");
}

phone.models = phone.models.filter(m => m.model !== model);

await phone.save();

res
.status(200)
.json(new ApiResponse(200, phone, "Model deleted successfully"));

});