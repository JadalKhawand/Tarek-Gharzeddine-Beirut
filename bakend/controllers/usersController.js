import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;

export async function register(req, res) {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "البريد الإلكتروني مسجل مسبقاً، يرجى تسجيل الدخول" });
    }

    const hashedPass = bcrypt.hashSync(password, saltRounds);
    const created = new User({ name, email, password: hashedPass, phone, role });
    await created.save();

    const safeUser = { id: created._id.toString(), name: created.name, email: created.email, role: created.role };
    const token = jwt.sign({ user: safeUser }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, message: "تم إنشاء الحساب بنجاح", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "فشل في إنشاء الحساب" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "البريد الإلكتروني وكلمة المرور مطلوبان" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "البريد الإلكتروني غير مسجل" });
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "كلمة المرور غير صحيحة" });
    }

    const safeUser = { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
    const token = jwt.sign({ user: safeUser }, process.env.JWT_SECRET, { expiresIn: "3h" });

    res.json({ success: true, token, user: safeUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "فشل في تسجيل الدخول" });
  }
}

export async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "المستخدم غير موجود" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "فشل في جلب بيانات المستخدم" });
  }
}

export async function updateProfile(req, res) {
  try {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "فشل تحديث البيانات" });
  }
}

export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    const valid = bcrypt.compareSync(currentPassword, user.password);
    if (!valid) return res.status(401).json({ error: "كلمة المرور الحالية غير صحيحة" });
    user.password = bcrypt.hashSync(newPassword, 10);
    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "فشل تغيير كلمة المرور" });
  }
}