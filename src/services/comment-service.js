import { isValidObjectId } from "mongoose";
import { CommentRepo, VideoRepo} from "../repositories/index.js";
import { ApiError } from "../utils/ApiError.js";
import { StatusCodes } from "http-status-codes";


class CommentService {

    constructor() {
        this.commentRepo = new CommentRepo();
        this.videoRepo = new VideoRepo();
    }

    async createComment(videoId, content, userId) {

        if(!isValidObjectId(videoId) || !isValidObjectId(userId._id)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid videoId or userId")
        }

        const video = await this.videoRepo.get(videoId);

        if(!video) {
            throw new ApiError(StatusCodes.NOT_FOUND, "video not found");
        }

        const comment = await this.commentRepo.create({
            content: content,
            video: videoId,
            owner: userId._id
        });

        if(!comment) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while createing error");
        }

        return comment;

    }

    async updateComment(commentId, content, userId) {
        if(!isValidObjectId(commentId) || !isValidObjectId(userId._id)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid videoId or userId")
        }

    
        const comment = await this.commentRepo.get(commentId);

        if(!comment) {
            throw new ApiError(StatusCodes.NOT_FOUND, "comment not found");
        }

        if(userId._id.toString() !== comment.owner.toString()) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "user is not authorized to update the comment");
        }

        const response = await this.commentRepo.update(commentId , {
            content: content
        })

        return response;
    }

    async deleteComment(commentId, userId) {
        if(!isValidObjectId(commentId) || !isValidObjectId(userId._id)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid commentId or userId")
        }

        const comment = await this.commentRepo.get(commentId);

        if(!comment) {
            throw new ApiError(StatusCodes.NOT_FOUND, "comment not found");
        }

        if(userId._id.toString() !== comment.owner.toString()) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "user is not authorized to delete the comment");
        }


        const response = await this.commentRepo.destroy(commentId);

        return response;
    }

    // TODO:
    async getVideoComments(videoId, pageNumber, limitNumber) {
        if(!isValidObjectId(videoId)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid videoId or userId")
        }

        const video = await this.videoRepo.get(videoId);

        if(!video) {
            throw new ApiError(StatusCodes.NOT_FOUND, "video not found");
        }

        const {comments, totalComments} = await this.commentRepo.getVideoComments(videoId, pageNumber, limitNumber);
        return {comments, totalComments};
    }
    
}

export default CommentService;