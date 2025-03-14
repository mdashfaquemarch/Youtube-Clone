import { isValidObjectId } from 'mongoose';
import {LikeRepo, TweetRepo, VideoRepo, CommentRepo} from '../repositories/index.js'
import { ApiError } from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';


class LikeService {

    constructor() {
        this.likeRepo = new LikeRepo();
        this.videoRepo = new VideoRepo();
        this.tweetRepo = new TweetRepo();
        this.commentRepo = new CommentRepo();
    }

    async toggleVideoLike(videoId, userId) {

        if(!isValidObjectId(videoId) || !isValidObjectId(userId._id)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid videoId or userId");
        }

        if(!userId._id) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "user is not authenticated");
        }


        const video = await this.videoRepo.get(videoId);

        if(!video) {
            throw new ApiError(StatusCodes.NOT_FOUND, "video not found");
        }

        const existingLike = await this.likeRepo.findOnlyOneAndDelete({
            video: videoId,
            likedBy: userId._id
        })


        if(existingLike) {
            return {statusCode: StatusCodes.OK, data: { isLiked: false, videoId: videoId}, message: "video unliked successfully"};
        }

        const likedVideo = await this.likeRepo.create({
            video: videoId,
            likedBy: userId._id
        })

        if(!likedVideo) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while liking the video")
        }

        return {statusCode: StatusCodes.OK, data: { isLiked: true, videoId: videoId }, message: "video liked successfully"};
    }

    //TODO: complete this method wrong method
    async toggleCommentLike(commentId, userId) {
        
        if(!isValidObjectId(commentId) || !isValidObjectId(userId._id)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid commentId or userId");
        }

        if(!userId._id) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "user is not authenticated");
        }


        const comment = await this.commentRepo.get(commentId);

        if(!comment) {
            throw new ApiError(StatusCodes.NOT_FOUND, "comment not found");
        }

        const existingLike = await this.likeRepo.findOnlyOneAndDelete({
            comment: commentId,
            likedBy: userId._id
        })

        if(existingLike) {
            return {statusCode: StatusCodes.OK, data: { isLiked: false, commentId: commentId}, message: "comment unliked successfully"};
        }

        const LikedComment =  await this.likeRepo.create({
            comment: commentId,
            likedBy: userId._id
        })

        if(!LikedComment) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error while liking the comment");
        }

        return {statusCode: StatusCodes.OK, data: { isLiked: true, commentId: commentId }, message: "comment liked successfully"};
    }

    async toggleTweetLike(tweetId, userId) {
        if(!isValidObjectId(tweetId) || !isValidObjectId(userId._id)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid videoId");
        }

        if(!userId._id) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "user is not authenticated");
        }


        const tweet = await this.tweetRepo.get(tweetId);

        if(!tweet) {
            throw new ApiError(StatusCodes.NOT_FOUND, "tweet not found");
        }

        const existingLike = await this.likeRepo.findOnlyOneAndDelete({
            tweet: tweetId,
            likedBy: userId._id
        })

        if(existingLike) {
            return {statusCode: StatusCodes.OK, data: { isLiked: false, tweetId: tweetId}, message: "tweet unliked successfully"};
        }

        const likedTweet = await this.likeRepo.create({
            tweet: tweetId,
            likedBy: userId._id
        })

        if(!likedTweet) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error while liking the tweet")
        }

        return {statusCode: StatusCodes.OK, data: { isLiked: true, tweetId: tweetId }, message: "tweet liked successfully"};
    }

    async getLikedVideos(userId) {

        if(!isValidObjectId(userId._id)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "invalid userId");
        }

        if(!userId._id) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "User is not authenticated")
        }

        const allLikedVideos = await this.likeRepo.findAllLikedVideos({
            likedBy: userId._id
        })

        return allLikedVideos;
    }
}

export default LikeService;