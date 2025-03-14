
import {asyncHandler} from "../utils/asyncHandler.js"

import {DashboardService} from '../services/index.js';
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/ApiResponse.js";

const dashboardService = new DashboardService();

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
})


// get channel video which is public and private videos

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const {channelId} = req.params;
    const {page, limit} = req.query;
    const userId = req.user?._id;
    // Convert `page` & `limit` to numbers and validate them
    const pageNumber = Math.max(parseInt(page, 10), 1) || 1;
    const limitNumber = Math.max(parseInt(limit, 10), 1) || 10;

    const {videos, totalVideos} = await dashboardService.channelVideos(channelId, userId, pageNumber, limitNumber);

    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        {
            videos: videos,
            pagination: {
            currentPage: pageNumber,
            totalPages: Math.ceil(totalVideos / limitNumber),
            totalVideos,
            hasNextPage: pageNumber * limitNumber < totalVideos,
            hasPrevPage: pageNumber > 1
            }
        },
        "dashboard videos fetched successfully"
    ))
})

export {
    getChannelStats, 
    getChannelVideos
    }