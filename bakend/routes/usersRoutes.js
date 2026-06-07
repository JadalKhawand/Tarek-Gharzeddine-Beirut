import express from "express"
import { login, register, getMe, updateProfile, changePassword } from "../controllers/usersController.js"
import { auth } from "../middleware/auth.js"

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/me", auth, getMe)  // get logged-in user's info
router.patch("/me",       auth, updateProfile)
router.patch("/password", auth, changePassword)

export default router;