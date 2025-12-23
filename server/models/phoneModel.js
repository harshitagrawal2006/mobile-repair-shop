import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  models: { type: [String], required: true }
});

export default mongoose.model("Phone", phoneSchema);
