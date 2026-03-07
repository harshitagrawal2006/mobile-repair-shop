import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema(
{
  brand: {
    type: String,
    required: [true, "Brand is required"],
    unique: true,
    trim: true,
  },

  models: [
    {
      model: {
        type: String,
        required: true,
        trim: true,
      },
      type: {
        type: String,
        required: true,
        enum: ["Android", "iPhone"],
      },
    },
  ],
},
{ timestamps: true }
);

export default mongoose.model("Phone", phoneSchema);