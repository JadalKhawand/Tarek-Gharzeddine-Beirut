import mongoose from "mongoose"

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["الطرق والأرصفة", "النفايات", "الإنارة العامة", "الحدائق والبيئة"]
  },
  description: {
    type: String,
    required: true
  },
  neighborhood: {
    type: String,
    required: true
  },
  street: {
    type: String
  },
  images: {
    type: [String], // store file paths or URLs
    default: []
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "resolved"],
    default: "pending"
  }
}, { timestamps: true })

export default mongoose.model("Complaint", complaintSchema);