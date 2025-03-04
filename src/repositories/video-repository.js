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
}

export default VideoRepo;