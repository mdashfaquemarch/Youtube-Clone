import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
     title: {
        type: String,
        required: true
     },
     description: {
        type: String,
        required: true
     },
     videoFile: {
        type: String, // cloudinary url
        required: true
     },
     thumbnail: {
        type: String, // cloudinary url
        required: true
     },
     duration: {
        type: Number,
        required: true
     },
     isPublished: {
        type: Boolean,
        default: true
     },
     views: {
      type: Number,
      default: 0
     },
     owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
     }
}, {timestamps: true});

export const Video = mongoose.model("Video", videoSchema);