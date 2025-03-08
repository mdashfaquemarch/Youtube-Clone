import {SubsRepo} from '../repositories/index.js'


class SubscriptionService {

    constructor() {
        this.serviceRepo = new SubsRepo();
    }

    async toggleSubscription(channelName, userId) {

        const channel = await User.findOne({username: channelName});

        // Check if channel exists
    if (!channel) {
        return console.log("Channel not found");
    }

        if(channel._id.toString() === userId.toString()) {
           return console.log("user cannot subcribe to itself")
        }
   
        const existingSubscription = await this.serviceRepo.getOneAndDelte({
           subscriber: userId,
           subscription: channel._id
        })
   
        if (existingSubscription) {
            return { statusCode: 200, data: { subscribed: false }, message: "Unsubscribed successfully" };
        }

        await this.serviceRepo.create({
            subscriber: userId,
            subscription: channel._id
        })

        return { statusCode: 200, data: { subscribed: true }, message: "Subscribed successfully" };
    }
}

export default SubscriptionService;

