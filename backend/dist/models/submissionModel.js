"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const submissionSchema = new mongoose_1.default.Schema({
    problemId: {
        type: String,
        required: [true, "Please provide a problemId"],
        unique: false,
    },
    problemName: {
        type: String,
        required: [true, "Please provide a problemName"],
        unique: false,
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
    timeSubmitted: {
        type: Date,
        required: [true, "Please provide a timeSubmitted"],
        unique: true,
    }
});
const SubmissionModel = mongoose_1.default.models.SubmissionModel || mongoose_1.default.model("Submission", submissionSchema);
exports.default = SubmissionModel;
