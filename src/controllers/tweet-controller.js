import mongoose, { isValidObjectId } from "mongoose"

import {asyncHandler} from "../utils/asyncHandler.js";

import {TweetService} from "../services/index.js";

const tweetService = new TweetService();

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const tweetContent = req.body;
    const user = req.user;

    const response = await tweetService.createTweet(tweetContent, user);
    
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}