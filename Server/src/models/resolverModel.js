import mongoose from "mongoose";

const resolverSchema = new mongoose.Schema({
  name: { type: String, required: true },

  // Authentication
  email: { type: String, required: true, unique: true }, // login email
  password: { type: String, required: true },

  // Resolver details
  staffId: { type: String, required: true, unique: true }, // Official staff ID
  designation: { type: String,required:true }, // Chief Warden, Assistant Warden, etc.
  hostelName: { type: String, required: true }, // Hostel they manage

  phoneNumber: { type: String,required:true },
}, { timestamps: true });// Add createdAt and updatedAt fields

export default mongoose.model("Resolver", resolverSchema);
