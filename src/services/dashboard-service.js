import { isValidObjectId } from 'mongoose';
import {VideoRepo, UserRepo}  from '../repositories/index.js';
import { ApiError } from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';

class DashboardService {

    constructor() {
     this.videoRepo = new VideoRepo();
     this.userRepo  = new UserRepo();
    }

    // dashboard:  getChannelVideos
    async channelVideos(channelId, userId, pageNumber, limitNumber) {
        if(!isValidObjectId(channelId) || !isValidObjectId(userId)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid channelId or UserId")
        }

        if(channelId.toString() !== userId.toString()) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "❌ Whoops! You don’t own this channel. Nice try though!");  
        }

        const {videos, totalVideos} = await this.videoRepo.getAllDashboardVideos(channelId,pageNumber, limitNumber);

        if(!videos) {
            throw new ApiError(StatusCodes.NOT_FOUND, "videos not found");
        }

        return {videos, totalVideos};
    }

    async channelStats() {
        
    }
} 

export default DashboardService;