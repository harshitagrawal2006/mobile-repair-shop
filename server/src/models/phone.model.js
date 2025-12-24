import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "Brand is required"],
      unique: true, // ← Keep this
      trim: true,
    },
    models: {
      type: [String],
      required: [true, "At least one model is required"],
    },
  },
  { timestamps: true }
);

 

export default mongoose.model("Phone", phoneSchema);
