import mongoose from 'mongoose';

const grievanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [
    { link: { type: String } }
  ],
  status: { type: String, enum: ["pending","running", "done"], default: "pending" },
  category: { 
    type: String, 
    enum: ["cleanliness", "security", "maintenance", "mess", "internet","other"], 
    required: true,
    default: "other"
  }
}, { timestamps: true });

const Grievance = mongoose.model("Grievance", grievanceSchema);

export default Grievance;
