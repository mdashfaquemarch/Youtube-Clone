import { CrudRepo } from "./index.js";
import { Video } from "../models/videos-model.js";
import mongoose from "mongoose";

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

    const totalVideos = await Video.countDocuments({owner: channelId});
    
    return { videos, totalVideos };
  }
}

export default VideoRepo;
