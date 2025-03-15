import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/users-model.js";
import mongoose from "mongoose";




//  videos [] -> it has title thumnail and owner username and avatar views
const getAllVideosOfChannel = async (req, res) => {

}

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
