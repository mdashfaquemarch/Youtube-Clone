import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { config } from "../config/server-config.js";

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



userSchema.pre("save", function (next) {
    if(!this.isModified("password")) next()
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})


userSchema.methods.isPasswordCorrect = function(mypassword) {
    return bcrypt.compareSync(mypassword, this.password);
}



userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        config.ACCESS_TOKEN_SECRET
        ,
        {
            expiresIn: config.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        config.REFRESH_TOKEN_SECRET
        ,
        {
            expiresIn: config.REFRESH_TOKEN_EXPIRY
        }
    )
}




export const User = mongoose.model("User", userSchema);