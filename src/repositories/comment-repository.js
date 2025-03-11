import {Comment} from '../models/comments-model.js'
import {CrudRepo} from './index.js'

class CommentRepo extends CrudRepo {

    constructor() {
        super(Comment)
    }

    async getVideoComments(videoId, pageNumber, limitNumber) {
        const response = await Comment.find({video: videoId}).sort({createdAt: -1}).skip((pageNumber - 1) * limitNumber).limit(limitNumber);
        return response;
    }


}

export default CommentRepo;