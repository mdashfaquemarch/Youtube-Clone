import express from 'express';
import { getAllVideosOfChannel, getChannelProfile , getUserChannelWatchHistory} from '../../controllers/channel-controller.js';
import {verifyAuth} from '../../middlewares/auth-middleware.js'

const router = express.Router();

router.use(verifyAuth);


router.route("/profile/:username").get(getChannelProfile)
router.route("/watchhistory").get(getUserChannelWatchHistory)
router.route("/videos/:username").get(getAllVideosOfChannel);

export default router;