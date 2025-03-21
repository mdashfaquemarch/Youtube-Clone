






import { StatusCodes } from "http-status-codes";
import { Video } from "../models/videos-model.js";
import { Subscription } from "../models/subscriptions-model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from '../utils/ApiResponse.js'


// ✅ Trending = High views + Likes + Recent uploads
const trendingVideos = asyncHandler( async (req, res) => {
      const trendingVideos = await Video.find({})
      .sort({views: -1})
      .populate("owner", "username avatar")
      .limit(15)
      .lean()


      return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        trendingVideos,
        "trending video fetched successfully"
      ))
});

// 🎯 Controller to get the YouTube feed
 const getFeed = asyncHandler(async (req, res) => {
  const userId = req.user?._id; // Get the logged-in user ID (if exists)
  const { page = 1, limit = 10 } = req.query; // Get page & limit from query

  const pageNumber = Math.max(parseInt(page, 10), 1); // Ensure page is at least 1
  const limitNumber = Math.max(parseInt(limit, 10), 1); // Ensure limit is at least 1

  let feedVideos = []; // This will store the final videos
  let totalVideos = 0; // This will store the total video count

  // ✅ If user is logged in, fetch subscribed videos first
  if (userId) {
    const subscriptions = await Subscription.find({ subscriber: userId }).select("subscription");
    const subscribedChannelIds = subscriptions.map(sub => sub.subscription);

    if (subscribedChannelIds.length > 0) {
      // 🎬 Get latest videos from subscribed channels
      feedVideos = await Video.find({ owner: { $in: subscribedChannelIds } })
        .populate("owner", "username avatar") // Get owner (channel) details
        .sort({ createdAt: -1 }) // Show latest videos first
        .limit(limitNumber)
        .skip((pageNumber - 1) * limitNumber)
        .lean();

      // 📊 Count total subscribed videos for pagination
      totalVideos = await Video.countDocuments({ owner: { $in: subscribedChannelIds } });
    }

    // ✅ If not enough subscribed videos, add trending videos
    if (feedVideos.length < limitNumber) {
      const trendingVideos = await Video.find({})
        .populate("owner", "username avatar")
        .sort({ views: -1, likes: -1 }) // Most views & likes first
        .limit(limitNumber - feedVideos.length)
        .skip((pageNumber - 1) * limitNumber)
        .lean();

      feedVideos = [...feedVideos, ...trendingVideos];
      totalVideos = Math.max(totalVideos, await Video.countDocuments());
    }
  } else {
    // ✅ If user is NOT logged in, show trending videos
    feedVideos = await Video.find({})
      .populate("owner", "username avatar")
      .sort({ views: -1, likes: -1 }) // Most views & likes first
      .limit(limitNumber)
      .skip((pageNumber - 1) * limitNumber)
      .lean();

    totalVideos = await Video.countDocuments();

    // ✅ If not enough trending videos, add random videos
    if (feedVideos.length < limitNumber) {
      const randomVideos = await Video.aggregate([
        { $sample: { size: limitNumber - feedVideos.length } }, // Get random videos
        { $lookup: { from: "users", localField: "owner", foreignField: "_id", as: "owner" } },
        { $unwind: "$owner" },
        { $project: { title: 1, thumbnail: 1, owner: { username: 1, avatar: 1 }, views: 1, likes: 1, createdAt: 1 } },
      ]);

      feedVideos = [...feedVideos, ...randomVideos];
    }
  }

  // ✅ Pagination logic
  return res.status(StatusCodes.OK).json({
    success: true,
    data: feedVideos,
    pagination: {
      currentPage: pageNumber,
      totalPages: Math.ceil(totalVideos / limitNumber),
      totalResults: totalVideos,
      hasNextPage: pageNumber * limitNumber < totalVideos,
      hasPrevPage: pageNumber > 1,
    },
    message: "Feed fetched successfully",
  });
});



export {getFeed, trendingVideos}

/*
  A recommendation system:

  
  1️⃣ Content-Based Filtering (Similar Videos)
👉 Recommends videos similar to what you watched before, based on tags, title, description.

💡 Example:

You watch "Football Highlights" → It suggests more football videos.
✅ Good for new platforms.
❌ Limited variety in recommendations.

2️⃣ Collaborative Filtering (Similar Users' Choices)
👉 Recommends videos based on what similar users have watched/liked.

💡 Example:

You and Alex both watch "Cooking Tips"
Alex also watches "Baking Tricks"
Now, "Baking Tricks" is recommended to you!
✅ More personalized.
❌ Struggles with new users/videos (cold start problem).

3️⃣ Hybrid Recommendation (Best of Both Worlds)
👉 Mixes Content-Based & Collaborative Filtering for better accuracy.

💡 Example:

Suggests videos based on your history + similar users' choices.
✅ More accurate & diverse recommendations.
❌ Computationally expensive.

4️⃣ Popularity-Based (Trending Videos)
👉 Recommends videos that are most viewed, liked, or shared.

💡 Example:

The top trending music video is recommended to everyone.
✅ Works for new users.
❌ Not personalized.

5️⃣ Deep Learning-Based (Smart AI Recommendations)
👉 Uses AI & Neural Networks to analyze watch time, likes, skips, engagement and suggest videos.

💡 Example:

If you watch a full 20-min video, it suggests similar long videos.
If you skip a video quickly, it stops recommending similar ones.
✅ Super accurate & dynamic.
❌ Needs a lot of data & computing power.

🎯 Which One Should You Use?
✅ Simple YouTube Clone → Content-Based + Popularity-Based
✅ Better Personalization → Hybrid (Content + Collaborative)
✅ Next-Level AI Feeds → Deep Learning-Based
*/