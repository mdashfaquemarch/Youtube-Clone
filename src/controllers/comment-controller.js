
import {asyncHandler} from "../utils/asyncHandler.js"
import {CommentService} from '../services/index.js'
import { StatusCodes } from "http-status-codes";
import {ApiResponse} from '../utils/ApiResponse.js'

const commentService = new CommentService();

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params;
    const {page = 1, limit = 10} = req.query
    // Convert `page` & `limit` to numbers and validate them
    const pageNumber = Math.max(parseInt(page, 10), 1) || 1;
    const limitNumber = Math.max(parseInt(limit, 10), 1) || 10;

    const {comments, totalComments} = await commentService.getVideoComments(videoId, pageNumber, limitNumber);

    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        {
            comments: comments,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalComments / limitNumber),
                totalComments,
                hasNextPage: pageNumber * limitNumber < totalComments,
                hasPrevPage: pageNumber > 1
            },
        },
         "Video comments fetched successfully",
    ));
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {content} = req.body;
    const {videoId} = req.params;
    const userId    = req.user;
    const response = await commentService.createComment(videoId, content, userId);
    return res.status(StatusCodes.CREATED).json(new ApiResponse(
        StatusCodes.CREATED,
        response,
        "comment created successfully"
    ));
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {content} = req.body;
    const {commentId} = req.params;
    const userId    = req.user;
    const response = await commentService.updateComment(commentId, content, userId);
    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "comment updated successfully"
    ));
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId} = req.params;
    const userId    = req.user;
    const response = await commentService.deleteComment(commentId, userId);
    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "comment deleted successfully"
    ));
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
}