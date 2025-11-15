import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // login 
  
  // Admin details
  role: { type: String, enum: ["student","warden","supervisor","system admin"], required:true }, // Hostel Coordinator, System Admin.
  staffId: { type: String, required: true, unique: true }, // Official staff ID
  designation: { type: String, enum: ["chief warden","warden","supervisor","system admin"], required:true }, // Hostel Coordinator, System Admin.
  hostelName: { type: String, enum:["A","B","C","D","E","F","G","H","I","J","K","L"], default: null, required: true }, // Hostel they manage

  phoneNumber: { type: String,required:true },
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
