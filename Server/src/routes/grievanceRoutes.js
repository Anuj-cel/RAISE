import express from "express";
import Grievance from "../models/grievance.js";
import upload from "../config/multer.js";

const router = express.Router();

// ✅ Create a new grievance (with image upload)
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const { userId, title, description } = req.body;

    // Extract Cloudinary URLs
    const images = req.files.map(file => ({ link: file.path }));

    const newGrievance = new Grievance({
      userId,
      title,
      description,
      images,
    });

    await newGrievance.save();

    res.status(201).json({ success: true, grievance: newGrievance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Get all grievances
router.get("/", async (req, res) => {
  try {
    const grievances = await Grievance.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, grievances });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Get single grievance by ID
router.get("/:id", async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id).populate("userId", "name email");

    if (!grievance) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, grievance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Update grievance (e.g., change status)
router.put("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const grievance = await Grievance.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!grievance)
      return res.status(404).json({ success: false, message: "Grievance not found" });

    res.json({ success: true, grievance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Delete grievance
router.delete("/:id", async (req, res) => {
  try {
    const grievance = await Grievance.findByIdAndDelete(req.params.id);
    if (!grievance)
      return res.status(404).json({ success: false, message: "Grievance not found" });

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
