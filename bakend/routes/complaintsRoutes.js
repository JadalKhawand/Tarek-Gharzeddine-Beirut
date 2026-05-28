import express from "express"
import { createComplaint, getMyComplaints, getAllComplaints } from "../controllers/complaintsController.js"
import { auth } from "../middleware/auth.js"
import multer from "multer"
import { adminAuth } from "../middleware/adminAuth.js"

const upload = multer({ dest: "uploads/", limits: { fileSize: 5 * 1024 * 1024 } })
const router = express.Router();

router.get("/", adminAuth, getAllComplaints)      // admins only
router.get("/my", auth, getMyComplaints)          // logged in users
router.post("/", auth, upload.array("images", 3), createComplaint)

export default router;