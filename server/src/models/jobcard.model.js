import mongoose from "mongoose";
import { JOB_STATUS } from "../config/constants.js";

const jobCardSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    alternateNumber: {
      type: String,
      trim: true,
    },
    phoneBrand: {
      type: String,
      required: [true, "Phone brand is required"],
      trim: true,
    },
    phoneModel: {
      type: String,
      required: [true, "Phone model is required"],
      trim: true,
    },
    problemDescription: {
      type: String,
      required: [true, "Problem description is required"],
      trim: true,
    },
    assignedMechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Assigned mechanic is required"],
    },
    requiredParts: [
      {
        partId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Part",
        },
        name: String,
        qty: {
          type: Number,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          min: [0, "Price cannot be negative"],
        },
      },
    ],
    status: {
      type: String,
      enum: [
        JOB_STATUS.ASSIGNED,
        JOB_STATUS.IN_PROGRESS,
        JOB_STATUS.COMPLETED,
        JOB_STATUS.DELIVERED,
      ],
      default: JOB_STATUS.ASSIGNED,
    },
  },
  { timestamps: true }
);

// Indexes for common queries
jobCardSchema.index({ status: 1 });
jobCardSchema.index({ assignedMechanic: 1 });

export default mongoose.model("JobCard", jobCardSchema);
