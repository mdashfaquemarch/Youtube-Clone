import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);