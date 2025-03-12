import { isValidObjectId } from "mongoose";
import { SubsRepo, UserRepo } from "../repositories/index.js";
import { ApiError } from "../utils/ApiError.js";
import { StatusCodes } from "http-status-codes";

class SubscriptionService {
    constructor() {
        this.subsRepo = new SubsRepo();
        this.userRepo = new UserRepo();
    }

    async toggleSubscription(channelId, userId) {
        // Validate Object IDs
        if (!isValidObjectId(channelId) || !isValidObjectId(userId)) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Invalid channelId or userId"
            );
        }

        // Fetch user & channel in parallel (reduce DB calls time)
        const [user, existingChannel] = await Promise.all([
            this.userRepo.get(userId),
            this.userRepo.get(channelId),
        ]);

        // Validate user & channel existence
        if (!user || !existingChannel) {
            throw new ApiError(StatusCodes.NOT_FOUND, "User or Channel not found");
        }

        // Prevent self-subscription
        if (user._id.toString() === existingChannel._id.toString()) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "User cannot subscribe to itself"
            );
        }

        const existingSubscription = await this.subsRepo.getOneAndDelete({
            subscriber: user._id,
            subscription: existingChannel._id,
        });

        if (existingSubscription) {
            return {
                statusCode: StatusCodes.OK,
                data: { subscribed: false },
                message: "Unsubscribed successfully",
            };
        }

        // Create new subscription
        await this.subsRepo.create({
            subscriber: user._id,
            subscription: existingChannel._id,
        });

        return {
            statusCode: StatusCodes.OK,
            data: { subscribed: true },
            message: "Subscribed successfully",
        };
    }

    async getChannelSubscribers(channelId) {
        if (!isValidObjectId(channelId)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid channelId");
        }

        const existingChannel = await this.userRepo.get(channelId);

        // Check if channel/user exists
        if (!existingChannel) {
            return console.log("Channel not found");
        }

        const subscribers = await this.subsRepo.getChannelInfo(
            {
                subscription: existingChannel._id,
            },
            {
                path: "subscriber",
                select: "username fullname avatar", // Only include relevant fields
            }
        );

        return subscribers;
    }

    async getUserSubscriptions(user) {
        if (!isValidObjectId(user._id)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid userId");
        }

        const existingUser = await this.userRepo.get(user._id);

        // Check if channel/user exists
        if (!existingUser) {
            return console.log("user not found");
        }

        const subscription = await this.subsRepo.getChannelInfo(
            {
                subscriber: existingUser._id,
            },
            {
                path: "subscription",
                select: "username fullname avatar", // Only include relevant fields
            }
        );

        return subscription;
    }
}

export default SubscriptionService;
