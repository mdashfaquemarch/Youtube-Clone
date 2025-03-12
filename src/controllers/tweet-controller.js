
import {asyncHandler} from "../utils/asyncHandler.js";

import {TweetService} from "../services/index.js";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/ApiResponse.js";

const tweetService = new TweetService();

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const tweetContent = req.body; 
    const user = req.user;

    const response = await tweetService.createTweet(tweetContent, user);
    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.CREATED,
        response,
        "tweet created successfully"
    ));
    
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    let { userId } = req.params;

    

    const response = await tweetService.getUserTweets(userId);
    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "user tweets fetched succcessfully"
    ));
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const {tweetId} = req.params;
    const data = req.body;

    const response = await tweetService.updateTweet(tweetId, data, req.user);
    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "Tweet updated successfully"
    ));
    
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const {tweetId} = req.params;

    const user = req.user;
    const response = await tweetService.deleteTweet(tweetId, user);
    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "Tweet deleted successfully"
    ));
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}