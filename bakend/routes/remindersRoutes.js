// remindersRoutes.js
import express from "express"
import { subscribe, getMyReminders, unsubscribe } from "../controllers/remindersController.js"
import { auth } from "../middleware/auth.js"

const router = express.Router();
router.post("/", auth, subscribe)
router.get("/", auth, getMyReminders)
router.delete("/:title", auth, unsubscribe)
export default router;