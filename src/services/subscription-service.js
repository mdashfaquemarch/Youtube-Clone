import { SubsRepo } from '../repositories/index.js'


class SubscriptionService {

    constructor() {
        this.subsRepo = new SubsRepo();
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

    async getUserSubscribers(channelName) {
        const channel = await this.subsRepo.findOnlyOne({ username: channelName });

        // Check if channel exists
        if (!channel) {
            return console.log("Channel not found");
        }

        const subscribers = await this.subsRepo.getChannelInfo(
            {
                subscription: channel._id
            },
            {
                path: "subscriber",
                select: "username fullname avatar", // Only include relevant fields
            }
        )

        return subscribers;
    }

    async getUserSubscriptions(channelName) {
        const channel = await this.subsRepo.findOnlyOne({ username: channelName });

        // Check if channel exists
        if (!channel) {
            return console.log("Channel not found");
        }

        const subscription = await this.subsRepo.getChannelInfo(
            {
                subscriber: channel._id
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

