import {CrudRepo} from './index.js';
import {Video} from '../models/videos-model.js';

class VideoRepo extends CrudRepo {
    constructor() {
        super(Video)
    }

    async getVideoById(id) {
        try {
            const response = await Video.findById(id).populate("owner", "username email fullname avatar coverImage");
            return response;
        } catch (error) {
            console.error("Something went wrong in the UserRepo : getUser");
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || "Something went wrong");
        }
    }

    async getAllVideosWithQuery(searchFilter, sortOptions, pageNumber, limitNumber) {
        // Fetch videos from DB
        const videos = await Video.find(searchFilter)
            .sort(sortOptions)  // 🔥 Sort by views/likes
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

            // Count total videos (for pagination)
        const totalVideos = await Video.countDocuments(searchFilter);

        return {videos, totalVideos};
    }
}

export default VideoRepo;