import JobCard from "../models/jobcard.model.js";
import Part from "../models/part.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * CREATE JOB CARD (ADMIN)
 */
export const createJobCard = asyncHandler(async (req, res) => {
  const {
    customerName,
    phoneNumber,
    alternateNumber,
    phoneBrand,
    phoneModel,
    problemDescription,
    assignedMechanic,
    status,
  } = req.body;

  // Validation
  if (!customerName || !phoneNumber || !phoneBrand || !phoneModel || !problemDescription || !assignedMechanic) {
    throw new ApiError(400, "All required fields must be provided");
  }


 const jobCard = await JobCard.create({
    customerName,
    phoneNumber,
    alternateNumber,
    phoneBrand,
    phoneModel,
    problemDescription,
    assignedMechanic,
    status: status || "Assigned",
    requiredParts: [],
  });

   res
    .status(201)
    .json(new ApiResponse(201, jobCard, "Job card created successfully"));
});


/**
 * ADD REQUIRED PARTS (MECHANIC)
 */
export const addRequiredParts = asyncHandler(async (req, res) => {
  const jobCard = await JobCard.findById(req.params.id);
   if (!jobCard) {
    throw new ApiError(404, "Job card not found");
  }

  const { requiredParts } = req.body;

  if (!requiredParts || !Array.isArray(requiredParts) || requiredParts.length === 0) {
    throw new ApiError(400, "Required parts must be a non-empty array");
  }
    // Check stock for all parts first (before updating anything)
  for (const item of requiredParts) {
    const part = await Part.findById(item.partId);
    
    if (!part) {
      throw new ApiError(404, `Part not found: ${item.partId}`);
    }

    if (part.stock < item.qty) {
      throw new ApiError(
        400,
        `Insufficient stock for ${part.partName}. Available: ${part.stock}, Required: ${item.qty}`
      );
    }
  }

  // Now update stock for all parts
  for (const item of requiredParts) {
    const part = await Part.findById(item.partId);
    part.stock -= item.qty;
    await part.save();
  }

  jobCard.requiredParts = requiredParts;
  jobCard.status = "In Progress";
  await jobCard.save();

  res
    .status(200)
    .json(new ApiResponse(200, jobCard, "Required parts added successfully"));
});

/**
 * UPDATE JOB STATUS
 */
export const updateJobStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) {
    throw new ApiError(400, "Status is required");
  }

  const updated = await JobCard.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!updated) {
    throw new ApiError(404, "Job card not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updated, "Status updated successfully"));
});

/**
 * GET ALL JOB CARDS
 */
export const getAllJobCards = asyncHandler(async (req, res) => {
  const cards = await JobCard.find()
    .populate("assignedMechanic", "name phone email")
    .populate("requiredParts.partId")
    .sort({ createdAt: -1 }); // Latest first

  res
    .status(200)
    .json(new ApiResponse(200, cards, "Job cards retrieved successfully"));
});


/**
 * GET SINGLE JOB CARD
 */
export const getJobCardById = asyncHandler(async (req, res) => {
  const card = await JobCard.findById(req.params.id)
    .populate("assignedMechanic", "name phone email")
    .populate("requiredParts.partId");

  if (!card) {
    throw new ApiError(404, "Job card not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, card, "Job card retrieved successfully"));
});
