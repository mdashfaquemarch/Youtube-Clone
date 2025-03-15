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
      },
      pipeline: [
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "owner",
            pipeline: [
              {
                $project: {
                  fullName: 1,
                  username: 1,
                  avatar: 1,
                },
              },
            ],
          },
        },
        {
          $addFields: {
            owner: {
              $first: "$owner",
            },
          },
        },
      ],
    },
  ]);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        user[0].watchHistory,
        "Watch history fetched successfully"
      )
    );
};

const getChannelProfile = async (req, res) => {
  const { username } = req.params;

  if (!username.trim()) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "username is missing");
  }

  const channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
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
        subscribersCount: {
          $size: "$subscribers",
        },
        subscriptionCount: {
          $size: "$subscriptions",
        },
        isSubscribed: {
          $cond: {
            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
            then: true,
            else: false,
          },
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

  if (!channel || channel.length === 0) {
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
