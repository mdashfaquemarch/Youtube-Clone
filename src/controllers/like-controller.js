import mongoose, {isValidObjectId} from "mongoose"

import {asyncHandler} from "../utils/asyncHandler.js"
import {LikeService} from '../services/index.js'
import { StatusCodes } from "http-status-codes";

const likeService = new LikeService();

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    //TODO: toggle like on video
    const userId = req.user;

    const response = await likeService.toggleVideoLike(videoId, userId);

    return res.status(StatusCodes.OK).json(response);
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment

    const userId = req.user;

    const response = await likeService.toggleVideoLike(videoId, userId);

    return res.status(StatusCodes.OK).json(response);
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    const userId = req.user;

    const response = await likeService.toggleVideoLike(videoId, userId);

    return res.status(StatusCodes.OK).json(response);
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const userId = req.user;

    const response = await likeService.toggleVideoLike(videoId, userId);

    return res.status(StatusCodes.OK).json(response);
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}