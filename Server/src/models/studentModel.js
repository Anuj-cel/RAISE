import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },

  // Authentication
  collegeEmail: { type: String, required: true, unique: true }, // login email
  password: { type: String, required: true },

  // Student details
  personalEmail: { type: String,required: true, unique: true },
  collegeId: { type: String, required: true, unique: true }, // Registration ID
  rollNumber: { type: String, required: true, unique: true }, // Exam roll no.
  course: { type: String,required: true }, // B.Tech, M.Tech, PhD, etc.
  yearOfStudy: { type: Number,required:true }, // 1–4
  hostelName: { type: String, required: true },
  roomNumber: { type: String, required: true },

  phoneNumber: { type: String },
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
