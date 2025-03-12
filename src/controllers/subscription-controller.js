
import {asyncHandler} from "../utils/asyncHandler.js";
import  {SubscriptionService} from '../services/index.js';


const subscriptionService = new SubscriptionService();

// ✅ Toggle user subscription to a channel (subscribe/unsubscribe)
const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelName} = req.params;
    // TODO: toggle subscription
    const userId = req.user?._id;

     const response = await subscriptionService.toggleSubscription(channelName, userId);

     return res.status(StatusCodes.OK).json(response);

})

// ✅ Get all subscribers of a channel
const getChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params;
    const userId = req.user?._id;

    const response = await subscriptionService.getChannelSubscribers(channelId);

     return res.status(StatusCodes.OK).json(response);
     
})

// ✅ Get all channels the user is subscribed to
const getSubscriptions  = asyncHandler(async (req, res) => {
    const user = req.user;

    const response = await subscriptionService.getUserSubscriptions(user);

     return res.status(StatusCodes.OK).json(response);
})

export {
    toggleSubscription,
    getChannelSubscribers,
    getSubscriptions
}