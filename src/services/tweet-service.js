import { StatusCodes } from 'http-status-codes';
import {TweetRepo} from '../repositories/index.js';
import { ApiError } from '../utils/ApiError.js';
import { isValidObjectId } from 'mongoose';


class TweetService {

    constructor() {
        this.tweetRepo = new TweetRepo();
    }


    async createTweet(data, user) {

        if(!user._id) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "user is not authorized");
        }

        if(!isValidObjectId(user._id)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "userId is not valid");
        }


        if(!data.content) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "tweet content is required");
        }

        const tweet = await this.tweetRepo.create({
            content: data.content,
            owner: user?._id
        })

        return tweet;
    }


    async updateTweet(tweetId, data) {
        
    }

    async deleteTweet(tweetId, data) {

    }

    async getUserTweets(tweetId, data) {

    }


}


export default TweetService;