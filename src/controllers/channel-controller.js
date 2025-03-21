import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/users-model.js";
import {Video} from '../models/videos-model.js'
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";




const getAllVideosOfChannel = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const { page = 1, limit = 10 } = req.query; // Default page=1, limit=10

  // Convert query params to numbers
  const pageNumber = Math.max(parseInt(page, 10), 1);
  const limitNumber = Math.max(parseInt(limit, 10), 1);
  const skip = (pageNumber - 1) * limitNumber;

   const user = await User.findOne({username: username});

   if(!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "user not found")
   }
 
  // Fetch channel videos
  const allVideos = await Video.find({ owner: user._id })
    .sort({ createdAt: -1 }) // Newest videos first
    .populate("owner", "username avatar") // Get owner details
    .limit(limitNumber)
    .skip(skip)
    .lean()
    .exec();

  // Count total videos for pagination
  const totalVideos = await Video.countDocuments({ owner: user._id });

  return res.status(StatusCodes.OK).json(
    new ApiResponse(StatusCodes.OK, {
      videos: allVideos,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalVideos / limitNumber),
        totalResults: totalVideos,
        hasNextPage: pageNumber * limitNumber < totalVideos,
        hasPrevPage: pageNumber > 1,
      },
    },
    "Videos fetched successfully")
  );
});

/* user only check their own watch history */
const getUserChannelWatchHistory = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "User is not authenticated");
  }

  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
            },
          },
          {
            $project: {
              title: 1,
              thumbnail: 1,
              views: 1,
              owner: { $arrayElemAt: ["$owner", 0] }, // Fix owner field
            },
          },
          {
            $project: {
              title: 1,
              thumbnail: 1,
              views: 1,
              "owner._id": 1,
              "owner.username": 1,
              "owner.avatar": 1,
            },
          },
        ],
      },
    },
  ]);

  if (!user.length) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        user[0]?.watchHistory || [],
        "Watch history fetched successfully"
      )
    );
};


const getChannelProfile = async (req, res) => {
  const { username } = req.params;

  if (!username || !username.trim()) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Username is missing");
  }

  const channel = await User.aggregate([
    {
      $match: {
        username: username.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscription",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscriptions",
      },
    },
    {
      $addFields: {
        subscribersCount: { $size: "$subscribers" },
        subscriptionCount: { $size: "$subscriptions" },
        isSubscribed: {
          $in: [new mongoose.Types.ObjectId(req.user?._id), "$subscribers.subscriber"],
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        subscribersCount: 1,
        subscriptionCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
      },
    },
  ]);

  if (!channel.length) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Channel does not exist");
  }

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        channel[0],
        "User channel fetched successfully"
      )
    );
};

export { getUserChannelWatchHistory, getChannelProfile , getAllVideosOfChannel};
