import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
// import grievanceRoutes from "./routes/grievanceRoutes.js";
import cors from "cors"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "./src/models/studentModel.js";
import Admin from "./src/models/adminModel.js";
import Grievance from "./src/models/grievance.js";
import { authoriseUser } from "./src/middleware/auth.middleware.js";
import path from "path";
import { upload } from "./src/middleware/upload.js";

//import routes
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

mongoose.connect(`${process.env.MONGO_URI}`)
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error(err));

// Student registration route
app.post("/register/student", async (req, res) => {
  try {
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

    const existing = await Student.findOne({ registrationId });
    if (existing)
      return res.status(400).json({ message: "Student already registered" });

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

    return res.status(201).json({ message: "Student registered successfully", student });
  } catch (err) {
    console.error("Student register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Admin registration route
app.post("/register/admin", async (req, res) => {
  try {
    const {
      staffId,
      name,
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
 
    const existing = await Admin.findOne({ staffId });
    if (existing)
      return res.status(400).json({ message: "Staff already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      staffId,
      name,
      designation,
      hostelName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Staff registered successfully", admin });
  } catch (err) {
    console.error("Admin register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


//login,signup
app.post("/login/student", async (req, res) => {
  try {
    const { registrationId, password } = req.body;
    if(!registrationId || !password)
      return res.status(400).json({message : "Incorrect username or password"});

    const student = await Student.findOne({ registrationId: registrationId.toLowerCase().trim() });

    if (!student)
      return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, student.password);
    if (!ok)
      return res.status(401).json({ message: "Wrong Password" });

    const token = jwt.sign(
      { role: "student", registrationId: student.registrationId },
      process.env.JWT_SECRETKEY,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "Login successful",
      token,
      role: "student",
      student,
    });
  } catch (err) {
    console.error("Student login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Admin login route
app.post("/login/admin", async (req, res) => {
  try {
    const { staffId, password } = req.body;
    if(!staffId || !password)
      return res.status(400).json({message : "Incorrect staffId or password"});

    const admin = await Admin.findOne({ staffId });

    if (!admin)
      return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok)
      return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign(
      { role: "admin", staffId: admin.staffId },
      process.env.JWT_SECRETKEY,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "Login successful",
      token,
      role: "admin",
      admin,
    });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Student profile API
app.get("/profile/student", authoriseUser, async (req, res) => {
  try {
    const user=req.user;
    if(!user)
      return res.status(403).json({message: "Invalid request"});

    const role=user.role;
    if (role !== "student") {
      return res.status(403).json({ message: "Access denied. Students only." });
    }

   const student = await Student.findOne(user.registrationId);

    if (!student) {
      return res.status(404).json({ message: "Data not found" });
    }

    return res.status(201).json({
      message: "Profile fetched successfully",
      student,
    });

  } catch (err) {
    console.error("Profile fetch error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


// Grievance API
app.get("/api/grievances/my", authoriseUser, async (req, res) => {
  try {
    const user=req.user;
    if (!user) {
      return res.status(403).json({ message: "Invalid request" });
    }

    const s_role=user.role;
    // Check if role is student
    if (s_role !== "student") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Find grievances belonging to logged-in student
    const grievances = await Grievance.find({ registrationId: user.registrationId });

    return res.status(201).json({ data:grievances });
  } catch (err) {
    console.error("Fetch grievances error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Add grievance API
app.post(
  "/api/grievances",
  authoriseUser,
  upload.array("images", 5), // Accept max 5 images uploaded with key "images"
  async (req, res) => {
    try {
      const user=req.user;
      if(!user)
        return res.status(403).json({message: "Invalid request"})

      const role=user.role;
      if (role !== "student") {
        return res.status(403).json({ message: "Only students can submit grievances" });
      }

      const { title, description, category } = req.body;

      if (!title || !description || !category) {
        return res.status(400).json({ message: "Title, description, and category are required" });
      }

      // Map uploaded files to image links (paths relative to server)
      const images = req.files ? req.files.map(file => ({ link: `/uploads/${file.filename}` })) : [];


      const grievance = new Grievance({
        registrationId: user.registrationId,
        title,
        description,
        category,
        images,
      });

      await grievance.save();

      return res.status(201).json({ message: "Grievance submitted successfully", grievance });
    } catch (err) {
      console.error("Create grievance error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

app.listen(8080, () => console.log("🚀 Server running on port 8080"));
