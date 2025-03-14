import {Comment} from '../models/comments-model.js'
import {CrudRepo} from './index.js'

class CommentRepo extends CrudRepo {

    constructor() {
        super(Comment)
    }

    async getVideoComments(videoId, pageNumber, limitNumber) {
        const comments = await Comment.find({video: videoId})
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber).populate("owner", "username avatar");

        const totalComments = await Comment.countDocuments({video: videoId});
        return {comments, totalComments};
    }

}

export default CommentRepo;