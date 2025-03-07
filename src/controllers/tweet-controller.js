import mongoose, { isValidObjectId } from "mongoose"

import {asyncHandler} from "../utils/asyncHandler.js";

import {TweetService} from "../services/index.js";
import { StatusCodes } from "http-status-codes";

const tweetService = new TweetService();

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const tweetContent = req.body;
    const user = req.user;

    const response = await tweetService.createTweet(tweetContent, user);
    return res.status(StatusCodes.OK).json(response);
    
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    let { username } = req.params;

    if(username.startsWith("@")) {
        username = username.slice(1);
    }

    const response = await tweetService.getUserTweets({username});
    return res.status(StatusCodes.OK).json(response);
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const {tweetId} = req.params;
    const data = req.body;

    const response = await tweetService.updateTweet(tweetId, data, req.user);
    return res.status(StatusCodes.OK).json(response);
    
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