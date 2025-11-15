import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../models/studentModel.js";
import Admin from "../models/adminModel.js";

const router = express.Router();

// ------------------- REGISTER -------------------
router.post("/register", async (req, res) => {
  try {
    const { role } = req.body;

    // ----------- STUDENT REGISTRATION -----------
    if (role === "student") {
      const {
        name,
        registrationId,
        course,
        yearOfStudy,
        personalEmail,
        phoneNumber,
        hostelName,
        roomNumber,
        password,
      } = req.body;

      if (
        !name ||
        !registrationId ||
        !course ||
        !yearOfStudy ||
        !personalEmail ||
        !hostelName ||
        !roomNumber ||
        !password
      ) {
        return res.status(400).json({ message: "Missing student fields" });
      }

      const existing = await Student.findOne({ personalEmail });
      if (existing)
        return res.status(400).json({ message: "Email already registered" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const student = await Student.create({
        name,
        registrationId,
        course,
        yearOfStudy,
        personalEmail,
        phoneNumber,
        hostelName,
        roomNumber,
        password: hashedPassword,
      });

      res
        .status(201)
        .json({ message: "Student registered successfully", student });
    }

    // ----------- ADMIN REGISTRATION -----------
    else if (role === "admin") {
      const {
        name,
        staffId,
        designation,
        hostelName,
        phoneNumber,
        email,
        password,
      } = req.body;

      if (
        !name ||
        !staffId ||
        !designation ||
        !hostelName ||
        !phoneNumber ||
        !email ||
        !password
      ) {
        return res.status(400).json({ message: "Missing admin fields" });
      }

      const existing = await Admin.findOne({ email });
      if (existing)
        return res.status(400).json({ message: "Email already registered" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const admin = await Admin.create({
        name,
        staffId,
        designation,
        hostelName,
        phoneNumber,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: "Admin registered successfully", admin });
    }

    // ----------- INVALID ROLE -----------
    else {
      res.status(400).json({ message: "Invalid role" });
    }
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------- LOGIN -------------------
router.post("/login", async (req, res) => {
  try {
    const { role, email, password } = req.body;

    // ----------- STUDENT LOGIN -----------
    if (role === "student") {
      const student = await Student.findOne({ personalEmail: email });
      if (!student)
        return res.status(401).json({ message: "Invalid credentials" });

      const ok = await bcrypt.compare(password, student.password);
      if (!ok)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: student._id, role: "student", email: student.personalEmail },
        process.env.JWT_SECRETKEY,
        { expiresIn: "1h" }
      );

      // ✅ send token + student info
      return res.json({
        message: "Login successful",
        token,
        student,
      });
    }

    // ----------- ADMIN LOGIN -----------
    if (role === "admin") {
      const admin = await Admin.findOne({ email });
      if (!admin)
        return res.status(401).json({ message: "Invalid credentials" });

      const ok = await bcrypt.compare(password, admin.password);
      if (!ok)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: admin._id, role: "admin", email: admin.email },
        process.env.JWT_SECRETKEY,
        { expiresIn: "1h" }
      );

      return res.json({
        message: "Login successful",
        token,
        admin,
      });
    }

    // ----------- INVALID ROLE -----------
    res.status(400).json({ message: "Invalid role" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export const authRoutes = router;
