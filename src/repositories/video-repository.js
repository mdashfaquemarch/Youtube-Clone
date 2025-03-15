import { CrudRepo } from "./index.js";
import { Video } from "../models/videos-model.js";
import mongoose from "mongoose";
import { User } from "../models/users-model.js";
import { Subscription } from "../models/subscriptions-model.js";
import { Like } from "../models/likes-model.js";
import { Comment } from "../models/comments-model.js";

class VideoRepo extends CrudRepo {
  constructor() {
    super(Video);
  }

  async getVideoById(id) {
    try {
      const response = await Video.findById(id).populate(
        "owner",
        "username email fullname avatar coverImage"
      );
      return response;
    } catch (error) {
      console.error("Something went wrong in the UserRepo : getUser");
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message || "Something went wrong"
      );
    }
  }

  async getAllVideosWithQuery(
    searchFilter,
    sortOptions,
    pageNumber,
    limitNumber
  ) {
    // Fetch videos from DB
    const videos = await Video.find(searchFilter)
      .sort(sortOptions) // 🔥 Sort by views/likes
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    // Count total videos (for pagination)
    const totalVideos = await Video.countDocuments(searchFilter);

    return { videos, totalVideos };
  }

  async getAllDashboardVideos(channelId, pageNumber, limitNumber) {
    /*
        const videos = await Video.find({owner: channelId})
        .sort({createdAt: -1})
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)

        const totalVideos = await Video.countDocuments({owner: channelId});

        */

    const videos = await Video.aggregate([
      {
        $match: { owner: new mongoose.Types.ObjectId(channelId) },
      },
      {
        $sort: { createdAt: -1 }, // sort by latest
      },
      {
        $skip: (pageNumber - 1) * limitNumber, // Pagination: Skip
      },
      {
        $limit: limitNumber, // Pagination: Limit results
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "video",
          as: "likes",
        },
      },
      {
        $addFields: {
          likeCount: { $size: "$likes" }, // Count the number of likes
        },
      },
      {
        $project: {
          likes: 0, // Exclude full likes array for performance
        },
      },
    ]);

    const totalVideos = await Video.countDocuments({ owner: channelId });

    return { videos, totalVideos };
  }

  /*
 - get video by Id -
 - it adds views to the video and add video to user watchHistory
 - response - channel subscriber avatar username channel -is subscribed or not -total subscriber
 - resonse - video title decription thumbnail total like of video total views of video if video is liked or not
 - response - total comments comments with like if comments is liked or not 
*/

async  getVideoDetails(videoId, userId) {
  //  Step 1: Increment video views
  const video = await Video.findByIdAndUpdate(
    videoId,
    { $inc: { views: 1 } },
    { new: true }
  ).populate("owner", "username avatar"); // Populate channel (owner)

  if (!video) return null; // If video not found

  //  Step 2: Add video to user's watch history
  await User.findByIdAndUpdate(userId, { $addToSet: { watchHistory: videoId } });

  //  Step 3: Get subscription status (is user subscribed?)
  const isSubscribed = await Subscription.exists({
    subscriber: userId,
    subscription: video.owner._id,
  });

  //  Step 4: Get total subscribers of the channel
  const totalSubscribers = await Subscription.countDocuments({
    subscription: video.owner._id,
  });

  //  Step 5: Check if the user liked the video
  const isLiked = await Like.exists({ video: videoId, likedBy: userId });

  //  Step 6: Get total likes of the video
  const totalLikes = await Like.countDocuments({ video: videoId });

  //  Step 7: Fetch all comments on the video
  const comments = await Comment.find({ video: videoId })
    .populate("owner", "username avatar") // Populate comment owner details
    .lean(); // Convert to plain objects for easier manipulation

  //  Step 8: Get total comments count
  const totalComments = comments.length;

  //  Step 9: Get user liked comments
  const likedComments = await Like.find({
    likedBy: userId,
    comment: { $in: comments.map((comment) => comment._id) },
  }).lean();

  //  Step 10: Process comments to check if user liked them
  const commentsWithLikes = comments.map((comment) => ({
    _id: comment._id,
    text: comment.content,
    owner: comment.owner,
    likes: likedComments.filter((like) => like.comment.toString() === comment._id.toString()).length,
    isLiked: likedComments.some((like) => like.comment.toString() === comment._id.toString()),
  }));

  // Step 11: Construct response object
  return {
    title: video.title,
    description: video.description,
    thumbnail: video.thumbnail,
    views: video.views,
    totalLikes,
    totalComments,
    isLiked: Boolean(isLiked),
    channel: {
      _id: video.owner._id,
      username: video.owner.username,
      avatar: video.owner.avatar,
      totalSubscribers,
      isSubscribed: Boolean(isSubscribed),
    },
    comments: commentsWithLikes,
  };
}

}

export default VideoRepo;
