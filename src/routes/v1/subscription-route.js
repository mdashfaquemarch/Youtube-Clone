import express from 'express';
import {getChannelSubscribers, getSubscriptions, toggleSubscription} from '../../controllers/subscription-controller.js';
import { verifyAuth } from '../../middlewares/auth-middleware.js';
// GET	/api/subscriptions/:userId	Get all subscriptions of a user
// POST	/api/subscriptions/:channelId	Subscribe to a channel
// DELETE	/api/subscriptions/:channelId	Unsubscribe from a channel

const router = express.Router();

router.use(verifyAuth); // Apply verifyJWT middleware to all routes in this file

// ✅ Get user's subscribed channels
router.route("/subscriptions").get(getSubscriptions);  

// ✅ Toggle subscription (subscribe/unsubscribe to a channel) &&& ✅ Get subscribers of a specific channel
router.route("/c/:channelId").post(toggleSubscription).get(getChannelSubscribers);



export default router;
