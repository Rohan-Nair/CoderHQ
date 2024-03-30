"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// this is the schema for the profile page of a user for a leetcode type online coding platform application
const profileSchema = new mongoose_1.default.Schema({
    pfpUrl: {
        type: String,
        required: false,
        unique: true,
    },
    problemsSolved: {
        type: Number,
        required: false,
        unique: false
    },
    name: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
});
const ProfileModel = mongoose_1.default.models.ProfileModel || mongoose_1.default.model("Profile", profileSchema);
exports.default = ProfileModel;
