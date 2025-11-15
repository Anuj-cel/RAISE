import User from "../models/User.js";
import studentModel from "../models/studentModel.js";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ message: "Missing fields" });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already used" });
    const user = new User({ name, email, password, role });
    await user.save();
    // If user.role === 'student', create Student document later via profile setup endpoint
    const token = signToken({ id: user._id, role: user.role });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { console.error(err); res.status(500).json({ message: "Server error" }); }
};
ā
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await user.isPasswordCorrect(password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = signToken({ id: user._id, role: user.role });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role }});
  } catch(err){ res.status(500).json({ message: "Server error" }); }
};
