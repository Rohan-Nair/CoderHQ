import mongoose from "mongoose";


// this is the schema for the profile page of a user for a leetcode type online coding platform application
const profileSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: false,
    }
})

const ProfileModel = mongoose.models.ProfileModel || mongoose.model("Profile", profileSchema);
export default ProfileModel;