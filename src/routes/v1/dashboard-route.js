import { Router } from 'express';
import {
    getChannelStats,
    getChannelVideos,
} from "../../controllers/dashboard-controller.js"
import {verifyAuth} from "../../middlewares/auth-middleware.js"

const router = Router();

router.use(verifyAuth); // Apply verifyJWT middleware to all routes in this file

router.route("/:channelId/stats").get(getChannelStats);
router.route("/:channelId/videos").get(getChannelVideos);

export default router;