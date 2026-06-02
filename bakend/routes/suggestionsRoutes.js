// suggestionsRoutes.js
import express from "express"
import { createSuggestion, getMySuggestions, getAllSuggestions } from "../controllers/suggestionsController.js"
import { auth } from "../middleware/auth.js"
import { adminAuth } from "../middleware/adminAuth.js"
import multer from "multer"

const upload = multer({ dest: "uploads/", limits: { fileSize: 5 * 1024 * 1024 } })
const router = express.Router();
router.post("/", auth, upload.array("files", 3), createSuggestion)
router.get("/my", auth, getMySuggestions)
router.get("/", adminAuth, getAllSuggestions)
export default router;