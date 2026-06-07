import Payment from "../models/Payment.js"
import { v4 as uuidv4 } from "uuid"

export async function createPayment(req, res) {
  try {
    const { feeType, amount, billingName, billingEmail, paymentMethod } = req.body;
    if (!feeType || !amount) return res.status(400).json({ error: "feeType and amount are required" });

    const payment = new Payment({
      user: req.user.id,
      feeType,
      amount,
      billingName,
      billingEmail,
      paymentMethod,
      transactionId: `BEI-${Date.now().toString().slice(-8)}`,
      status: "completed",
    });

    await payment.save();
    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ error: "فشل تسجيل الدفع" });
  }
}

export async function getMyPayments(req, res) {
  try {
    const payments = await Payment.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "فشل جلب المدفوعات" });
  }
}

export async function getAllPayments(req, res) {
  try {
    const payments = await Payment.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
}

export async function updatePaymentStatus(req, res) {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
}