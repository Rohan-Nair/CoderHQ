import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    problemId: {
        type: String,
        required: [true, "Please provide a problemId"],
        unique: true,
    },
    problemName: {
        type: String,
        required: [true, "Please provide a problemName"],
        unique: true,
    },
    userId: {
        type: String,
        required: [true, "Please provide a userId"],
        unique: false,
    },
    code: {
        type: String,
        required: [true, "Please provide a code"],
        unique: false,
    },
    language: {
        type: String,
        required: [true, "Please provide a language"],
        unique: false,
    },
    status: {
        type: String,
        required: [true, "Please provide a status"],
        unique: false,
    },
})

const SubmissionModel = mongoose.models.SubmissionModel || mongoose.model("Submission", submissionSchema);

export default SubmissionModel;