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
}

export default LikeRepo;