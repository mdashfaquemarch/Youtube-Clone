import { isValidObjectId } from 'mongoose';
import { SubsRepo , UserRepo} from '../repositories/index.js'
import { ApiError } from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';


class SubscriptionService {

    constructor() {
        this.subsRepo = new SubsRepo();
        this.userRepo = new UserRepo();
    }

    async toggleSubscription(channelName, userId) {

        const channel = await this.subsRepo.findOnlyOne({ username: channelName });

        // Check if channel exists
        if (!channel) {
            return console.log("Channel not found");
        }

        if (channel._id.toString() === userId.toString()) {
            return console.log("user cannot subcribe to itself")
        }

        const existingSubscription = await this.subsRepo.getOneAndDelete({
            subscriber: userId,
            subscription: channel._id
        })

        if (existingSubscription) {
            return { statusCode: 200, data: { subscribed: false }, message: "Unsubscribed successfully" };
        }

        await this.subsRepo.create({
            subscriber: userId,
            subscription: channel._id
        })

        return { statusCode: 200, data: { subscribed: true }, message: "Subscribed successfully" };
    }

    async getChannelSubscribers(channelId) {
        if(!isValidObjectId(channelId)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid channelId");
        }

        const existingChannel  = await this.userRepo.get(channelId);

        // Check if channel/user exists
        if (!existingChannel ) {
            return console.log("Channel not found");
        }


        const subscribers = await this.subsRepo.getChannelInfo(
            {
                subscription: existingChannel._id
            },
            {
                path: "subscriber",
                select: "username fullname avatar", // Only include relevant fields
            }
        )

        return subscribers;
    }

    async getUserSubscriptions(user) {

        if(!isValidObjectId(user._id)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid userId");
        }

        const existingUser  = await this.userRepo.get(user._id);

        // Check if channel/user exists
        if (!existingUser ) {
            return console.log("user not found");
        }

        const subscription = await this.subsRepo.getChannelInfo(
            {
                subscriber: existingUser._id
            },
            {
                path: "subscription",
                select: "username fullname avatar", // Only include relevant fields
            }
        )

        return subscription;


    }
}

export default SubscriptionService;

