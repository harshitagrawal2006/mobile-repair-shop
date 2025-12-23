import mongoose from "mongoose";

const jobCardSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    alternateNumber: {
      type: String,
    },

    phoneBrand: {
      type: String,
      required: true,
    },

    phoneModel: {
      type: String,
      required: true,
    },

    problemDescription: {
      type: String,
      required: true,
    },

    assignedMechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    requiredParts: [
      {
        partId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Part",
        },
        name: String,
        qty: Number,
        price: Number,
      },
    ],

    status: {
      type: String,
      enum: ["Assigned", "In Progress", "Completed", "Delivered"],
      default: "Assigned",
    },
  },
  { timestamps: true }
);

export default mongoose.model("JobCard", jobCardSchema);
