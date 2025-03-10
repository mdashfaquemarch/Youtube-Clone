
import {asyncHandler} from "../utils/asyncHandler.js"
import {CommentService} from '../services/index.js'
import { StatusCodes } from "http-status-codes";

const commentService = new CommentService();

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params;
    const {page = 1, limit = 10} = req.query
    // Convert `page` & `limit` to numbers and validate them
    const pageNumber = Math.max(parseInt(page, 10), 1) || 1;
    const limitNumber = Math.max(parseInt(limit, 10), 1) || 10;
    const response = await commentService.getVideoComments(videoId, pageNumber, limitNumber);
    return res.status(StatusCodes.CREATED).json(response);
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {content} = req.body;
    const {videoId} = req.params;
    const userId    = req.user;
    const response = await commentService.createComment(videoId, content, userId);
    return res.status(StatusCodes.CREATED).json(response);
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
}