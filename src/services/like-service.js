import { isValidObjectId } from 'mongoose';
import {LikeRepo} from '../repositories/index.js'
import { ApiError } from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';

class LikeService {

    constructor() {
        this.likeRepo = new LikeRepo();
    }

    async toggleVideoLike(videoId, userId) {

        if(isValidObjectId(videoId)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid videoId");
        }

        if(!userId._id) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "user is not authenticated");
        }


        const video = await this.likeRepo.get(videoId);

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

    async toggleTweetLike(videoId, userId) {
        if(isValidObjectId(videoId)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid videoId");
        }

        if(!userId._id) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "user is not authenticated");
        }


        const video = await this.likeRepo.get(videoId);

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

    async getLikedVideos() {

    }
}

export default LikeService;