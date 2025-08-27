import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },

  // Authentication
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Admin details
  employeeId: { type: String, required: true, unique: true },
  designation: { type: String,required:true }, // Dean, Hostel Coordinator, System Admin, etc.

  phoneNumber: { type: String,required:true },
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
