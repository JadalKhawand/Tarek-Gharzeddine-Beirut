import express from "express"
import { login, register, getMe } from "../controllers/usersController.js"
import { auth } from "../middleware/auth.js"

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/me", auth, getMe)  // get logged-in user's info

export default router;