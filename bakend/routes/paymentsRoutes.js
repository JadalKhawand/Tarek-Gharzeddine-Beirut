import express from "express"
import { createPayment, getMyPayments } from "../controllers/paymentsController.js"
import { auth } from "../middleware/auth.js"

const router = express.Router();
router.post("/",    auth, createPayment)
router.get("/my",   auth, getMyPayments)
export default router;