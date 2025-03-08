import mongoose, {isValidObjectId} from "mongoose"
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/users-model.js";
import { Subscription } from "../models/subscriptions-model.js";
import  {SubscriptionService} from '../services/index.js'


const subscriptionService = new SubscriptionService();

const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelName} = req.params;
    // TODO: toggle subscription
    const userId = req.user?._id;

     const response = await subscriptionService.toggleSubscription(channelName, userId);

     return res.status(StatusCodes.OK).json(response);

})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelName} = req.params;
    const userId = req.user?._id;

    const response = await subscriptionService.getUserSubscribers(channelName);

     return res.status(StatusCodes.OK).json(response);
     
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { channelName } = req.params;

    const response = await subscriptionService.getUserSubscribers(channelName);

     return res.status(StatusCodes.OK).json(response);
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}