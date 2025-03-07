import {CrudRepo} from "./index.js";
import {Tweet} from '../models/tweet-model.js'

class TweetRepo extends CrudRepo {

    constructor() {
        super(Tweet);
    }

    async findAllTweets(data) {
        const response = await Tweet.find(data);
        return response;
    }
}


export default TweetRepo;