import { StatusCodes } from 'http-status-codes';
import {TweetRepo, UserRepo} from '../repositories/index.js';
import { ApiError } from '../utils/ApiError.js';
import { isValidObjectId } from 'mongoose';


class TweetService {

    constructor() {
        this.tweetRepo = new TweetRepo();
        this.userRepo = new UserRepo();
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


    async updateTweet(tweetId, data, user) {

        if(!isValidObjectId(tweetId) || !isValidObjectId(user._id)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "tweetId is not valid");
        }
        
        const tweet = await this.tweetRepo.get(tweetId);

        if(!tweet) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Tweet not found");
        }

        if(tweet.owner.toString() !== user._id.toString()) {
          throw new ApiError(StatusCodes.FORBIDDEN, "You are not allowed to update this tweet");
        }

        const updatedTweet = await this.tweetRepo.update(tweetId,
            {
                $set: {
                    content: data.content
                }
            }
        );

        return updatedTweet;
    }

    async deleteTweet(tweetId, user) {
        if(!isValidObjectId(tweetId)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "tweetId is not valid");
        }
        const tweet = await this.tweetRepo.get(tweetId);

        if(!tweet) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Tweet not found");
        }

        if(tweet.owner.toString() !== user._id.toString()) {
            throw new ApiError(StatusCodes.FORBIDDEN, "You are not allowed to delete this tweet");
        }

        const deletedTweet = await this.tweetRepo.destroy(tweetId);

        return deletedTweet;
    }

    async getUserTweets(userId) {
        if(!isValidObjectId(userId)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "userId is not valid");
        }
      const user = await this.userRepo.get(userId);

      if(!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
      }


      const usersAllTweets = await this.tweetRepo.findAllTweets({owner: user?._id});

      return usersAllTweets;
    }


}


export default TweetService;