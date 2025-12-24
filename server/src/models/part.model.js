import mongoose from "mongoose";
import { PART_TYPES } from "../config/constants.js";

const partSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Model is required"],
      trim: true,
    },
    partName: {
      type: String,
      required: [true, "Part name is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: [PART_TYPES.ORIGINAL, PART_TYPES.COPY],
      required: [true, "Part type is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
  },
  { timestamps: true }
);

// Index for faster queries
partSchema.index({ brand: 1, model: 1 });

export default mongoose.model("Part", partSchema);
