import { isValidObjectId } from 'mongoose';
import {LikeRepo, TweetRepo, VideoRepo} from '../repositories/index.js'
import { ApiError } from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';
import { Video } from '../models/videos-model.js';

class LikeService {

    constructor() {
        this.likeRepo = new LikeRepo();
        this.videoRepo = new VideoRepo();
        this.tweetRepo = new TweetRepo
    }

    async toggleVideoLike(videoId, userId) {

        if(isValidObjectId(videoId)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid videoId");
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
            return {statusCode: StatusCodes.OK, data: { isLiked: false}, message: "video unliked successfully"};
        }

        await this.likeRepo.create({
            video: videoId,
            likedBy: userId._id
        })

        return {StatusCodes: StatusCodes.OK, data: { isLiked: true }, message: "video liked successfully"};
    }

    //TODO: complete this method wrong method
    async toggleCommentLike(commentId, userId) {
        if(isValidObjectId(commentId)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid commentId");
        }

        if(!userId._id) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "user is not authenticated");
        }


        const comment = await this.likeRepo.get(commentId);

        if(!comment) {
            throw new ApiError(StatusCodes.NOT_FOUND, "comment not found");
        }

        const existingLike = await this.likeRepo.findOnlyOneAndDelete({
            comment: commentId,
            likedBy: userId._id
        })

        if(existingLike) {
            return {statusCode: StatusCodes.OK, data: { isLiked: false}, message: "comment unliked successfully"};
        }

        await this.likeRepo.create({
            comment: commentId,
            likedBy: userId._id
        })

        return {StatusCodes: StatusCodes.OK, data: { isLiked: true }, message: "comment liked successfully"};
    }

    async toggleTweetLike(tweetId, userId) {
        if(isValidObjectId(tweetId)) {
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
            return {statusCode: StatusCodes.OK, data: { isLiked: false}, message: "tweet unliked successfully"};
        }

        await this.likeRepo.create({
            tweet: tweetId,
            likedBy: userId._id
        })

        return {StatusCodes: StatusCodes.OK, data: { isLiked: true }, message: "tweet liked successfully"};
    }

    async getLikedVideos(userId) {

        if(isValidObjectId(userId._id)) {
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