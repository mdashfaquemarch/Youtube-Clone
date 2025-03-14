
import {asyncHandler} from "../utils/asyncHandler.js"
import {LikeService} from '../services/index.js'
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from '../utils/ApiResponse.js'

const likeService = new LikeService();

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    //TODO: toggle like on video
    const userId = req.user;

    const {statusCode, data, message} = await likeService.toggleVideoLike(videoId, userId);

    return res.status(StatusCodes.OK).json(new ApiResponse(
        statusCode,
        data,
        message
    ));
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment

    const userId = req.user;

    const {statusCode, data, message} = await likeService.toggleCommentLike(commentId, userId);

    return res.status(StatusCodes.OK).json(new ApiResponse(
        statusCode,
        data,
        message
    ));
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    const userId = req.user;

    const response = await likeService.toggleTweetLike(tweetId, userId);

    return res.status(StatusCodes.OK).json(response);
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const userId = req.user;

    const response = await likeService.getLikedVideos(userId);

    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "user Liked video fetched successfully"
    ));
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}