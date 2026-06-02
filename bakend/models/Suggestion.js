import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    neighborhood: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    impact: { type: String },
    files: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Suggestion", suggestionSchema);
