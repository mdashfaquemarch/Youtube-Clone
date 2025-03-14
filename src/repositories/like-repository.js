import {CrudRepo} from './index.js'
import {Like} from '../models/likes-model.js'

class LikeRepo extends CrudRepo {

    constructor() {
        super(Like)
    }

    async findOnlyOneAndDelete(data) {
        const response = await Like.findOneAndDelete(data);
        return response;
    } 

    async findAllLikedVideos(data) {
        const response = await Like.find({
            ...data,
            video: {
                $exists: true
            }
        })
        .select("video")
        .populate({path: "video", populate: {
          path: "owner",
          select: "username avatar"
        }}).lean();

        const videos = response.map(like => like.video);
        return videos;
    }
}

export default LikeRepo;