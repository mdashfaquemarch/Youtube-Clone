import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users-model.js";
import { Video } from "../models/videos-model.js";
import { Subscription } from "../models/subscriptions-model.js";

class SearchService {
  constructor() {}

  async search(page, limit, query) {
    if (!query || query.trim() === "") {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Search query is required");
    }

    const regex = new RegExp(query, "i"); // Case-insensitive search

    // Step 1: Fetch all matching users & videos (No playlists)
    const [users, videos] = await Promise.all([
      User.find({ $or: [{ fullName: regex }, { username: regex }] }, "fullName username avatar")
        .lean(),

      Video.find({ title: regex }, "title thumbnail owner createdAt")
        .populate("owner", "username avatar")
        .sort({ createdAt: -1 }) // 🔹 Sort videos by newest first
        .lean(),
    ]);

    // Step 2: Fetch subscriber counts for users
    const userIds = users.map(user => user._id);
    const subscriberCounts = await Subscription.aggregate([
      { $match: { subscription: { $in: userIds } } },
      { $group: { _id: "$subscription", count: { $sum: 1 } } },
    ]);

    // Step 3: Map subscriber count to users
    const usersWithSubscribers = users.map(user => {
      const subscriberData = subscriberCounts.find(sub => sub._id.equals(user._id));
      return {
        ...user,
        subscriberCount: subscriberData ? subscriberData.count : 0,
      };
    });

    // Step 4: Combine users & videos into one array & apply pagination
    const allResults = [...usersWithSubscribers, ...videos];
    const totalResults = allResults.length;

    const totalPages = Math.ceil(totalResults / limit);
    const paginatedResults = allResults.slice((page - 1) * limit, page * limit);

    return {
      results: paginatedResults,
      pagination: {
        currentPage: page,
        totalPages,
        totalResults,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }
}

export default SearchService;
