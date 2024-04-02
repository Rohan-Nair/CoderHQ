import mongoose from "mongoose";


// this is the schema for the profile page of a user for a leetcode type online coding platform application
const profileSchema = new mongoose.Schema({
    pfpUrl: {
        type: String,
        required: false,
        unique: false,
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
})

const ProfileModel = mongoose.models.ProfileModel || mongoose.model("Profile", profileSchema);
export default ProfileModel;