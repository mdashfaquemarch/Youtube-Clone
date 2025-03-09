import {CrudRepo} from './index.js'
import {Like} from '../models/likes-model.js'

class LikeRepo extends CrudRepo {

    constructor() {
        super(Like)
    }

    async findOnlyOneAndDelete(data) {
        const response = await Like.findOneAndDelete(data).populate("videos");
        return response;
    } 

    async findAllLikedVideos(data) {
        const response = await Like.find(data);
        return response;
    }
}

export default LikeRepo;