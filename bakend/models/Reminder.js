import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    projectTitle: { type: String, required: true },
    projectTag: { type: String },
  },
  { timestamps: true },
);

// prevent duplicate subscriptions
reminderSchema.index({ user: 1, projectTitle: 1 }, { unique: true });

export default mongoose.model("Reminder", reminderSchema);
