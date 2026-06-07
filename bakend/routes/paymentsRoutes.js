import express from "express"
import { createPayment, getMyPayments, getAllPayments, updatePaymentStatus } from "../controllers/paymentsController.js"
import { auth } from "../middleware/auth.js"
import { adminAuth } from "../middleware/adminAuth.js"

const router = express.Router();
router.post("/",    auth, createPayment)
router.get("/my",   auth, getMyPayments)
router.get("/all",  auth, adminAuth, getAllPayments)
router.patch("/:id/status", adminAuth, updatePaymentStatus)
export default router;