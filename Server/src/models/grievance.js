import mongoose from 'mongoose'

const grievanceSchema=new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "Student"},
    title : {type : String, required: true},
    description : {type : String, required: true},
    images : [
        {link : {type : String}}
    ],
    status : {type: String, enum: [pending, done], default: "pending"},

}, {timestamps: true});

const grievance= mongoose.model("Grievance", grievanceSchema);

export default grievance;