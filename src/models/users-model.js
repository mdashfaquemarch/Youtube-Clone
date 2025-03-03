import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        lowercase: true,
        unique: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        lowercase: true,
        trim: true,
        unique: true
    },
    fullname: {
        type: String,
        required: [true, "fullname is required"],
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    avatar: {
        type: String, // cloudinary url
        required:true
    },
    coverImage: {
        type: String, // cloudinary url
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    refreshToken: {
        type: String
    }

}, {timestamps: true});


export const User = mongoose.model("User", userSchema);