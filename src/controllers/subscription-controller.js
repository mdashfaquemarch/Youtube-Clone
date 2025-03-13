
import {asyncHandler} from "../utils/asyncHandler.js";
import  {SubscriptionService} from '../services/index.js';
import { StatusCodes } from "http-status-codes";
import {ApiResponse} from '../utils/ApiResponse.js'

const subscriptionService = new SubscriptionService();

// ✅ Toggle user subscription to a channel (subscribe/unsubscribe)
const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params;
    // TODO: toggle subscription
    const userId = req.user?._id;

     const {statusCode, data, message} = await subscriptionService.toggleSubscription(channelId, userId);

     return res.status(StatusCodes.OK).json(new ApiResponse(
        statusCode,
        data,
        message
     ));

})

// ✅ Get all subscribers of a channel
const getChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params;
   
    const response = await subscriptionService.getChannelSubscribers(channelId);

     const flatData = response.map((sub) => ({
        _id: sub.subscriber._id,
        username:sub.subscriber.username,
        fullname:sub.subscriber.fullname,
        avatar:sub.subscriber.avatar,
        createdAt:sub.createdAt

     }))
     return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        flatData,
        "subscriber list successfully fetched"
     ));
     
})

// ✅ Get all channels the user is subscribed to
const getSubscriptions  = asyncHandler(async (req, res) => {
    const user = req.user;

    const response = await subscriptionService.getUserSubscriptions(user);

      const flatData = response.map((sub) => (
        {
            _id: sub.subscription._id,
            username:sub.subscription.username,
            fullname:sub.subscription.fullname,
            avatar:sub.subscription.avatar,
            createdAt:sub.createdAt
        }
      ))
     return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        flatData,
        "Subscription list successfully fetched"
     ));
})

export {
    toggleSubscription,
    getChannelSubscribers,
    getSubscriptions
}