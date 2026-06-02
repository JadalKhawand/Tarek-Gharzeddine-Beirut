import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
  user:          { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  feeType:       { type: String, required: true },
  amount:        { type: String, required: true },
  status:        { type: String, enum: ["pending", "completed", "failed"], default: "completed" },
  transactionId: { type: String },
  billingName:   { type: String },
  billingEmail:  { type: String },
  paymentMethod: { type: String, default: "بطاقة ائتمان" },
}, { timestamps: true })

export default mongoose.model("Payment", paymentSchema);