"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const problemSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please provide a problem name"],
    },
    title: {
        type: String,
        required: [true, "Please provide a problem title"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please provide a problem description"],
    },
    input: {
        type: String,
        required: [true, "Please provide a problem input"],
    },
    output: {
        type: String,
        required: [true, "Please provide a problem output"],
    },
});
const ProblemModel = mongoose_1.default.models.ProblemModel || mongoose_1.default.model('Problem', problemSchema);
exports.default = ProblemModel;
