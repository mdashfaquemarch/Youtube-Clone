import mongoose, { isValidObjectId } from 'mongoose';
import {VideoRepo, UserRepo, LikeRepo}  from '../repositories/index.js';
import { ApiError } from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';
import { Subscription } from '../models/subscriptions-model.js';
import { Video } from '../models/videos-model.js';

class DashboardService {

    constructor() {
     this.videoRepo = new VideoRepo();
     this.userRepo  = new UserRepo();
     this.likeRepo  = new LikeRepo();
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


        if(!videos.length) {
            throw new ApiError(StatusCodes.NOT_FOUND, "videos not found");
        }

        return {videos, totalVideos};
    }

    async channelStats(channelId, userId) {
        if(!isValidObjectId(channelId) || !isValidObjectId(userId)) {
           throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid channelId or userId")
        }

        if(channelId.toString() !== userId.toString()) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "❌ Whoops! You don’t own this channel. Nice try though!");  
        }

        const totalSubscribers = await Subscription.aggregate([
            {
                $match: { subscription : new mongoose.Types.ObjectId(channelId)}
            },
            {
                $count: "totalSubscriber"
            }
        ])

        const videoStats = await Video.aggregate([
            {
                $match: { owner: new mongoose.Types.ObjectId(channelId) }
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "video",
                    as: "likes"
                }
            }, 
            {
                $group: {
                    _id: null,
                    totalLikes: {
                        $sum: { $size: "$likes"}
                    },
                    totalViews: { $sum: "$views" },
                    totalVideos: { $sum: 1 }
                }
            },
        ])
        
        const channelStats = {
            totalSubscribers: totalSubscribers[0]?.subscribersCount || 0,
            totalLikes: videoStats[0]?.totalLikes || 0,
            totalViews: videoStats[0]?.totalViews || 0,
            totalVideos: videoStats[0]?.totalVideos || 0
        };
    
        return channelStats;
    }
} 

export default DashboardService;