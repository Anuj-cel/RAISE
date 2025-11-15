import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

  // Student details
  role: { type: String, default: "student" },
  name: { type: String, required: true },
  registrationId: { type: String, required: true, unique: true, lowercase:true, trim:true }, // Registration ID
  course: { type: String,enum:["B.Tech","MCA","M.Tech","PhD"], required: true }, // B.Tech, M.Tech, MCA, PhD, etc.
  yearOfStudy: { type: Number, required:true }, // 1–4
  personalEmail: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phoneNumber: { type: String },
  password:{type:String,required:true},
  hostelName: { type: String, enum:["A","B","C","D","E","F","G","H","I","J","K","L"],required: true },
  roomNumber: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
