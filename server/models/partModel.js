import mongoose from "mongoose";

const partSchema = new mongoose.Schema({
  brand: { type: String, required: true },          // Example: Samsung
  model: { type: String, required: true },          // Example: S23 Ultra
  partName: { type: String, required: true },       // Example: Display
  type: { type: String, enum: ["original", "copy"], required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Part", partSchema);
