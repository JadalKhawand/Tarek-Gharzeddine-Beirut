import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User.js"

dotenv.config()

export const adminAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"]

  if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" })

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer")
    return res.status(401).json({ error: "Invalid authorization format." })

  try {
    const decoded = jwt.verify(parts[1], process.env.JWT_SECRET)
    const user = await User.findById(decoded.user.id)
    if (!user || user.role !== "admin")
      return res.status(403).json({ error: "غير مصرح لك بالوصول" })
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}