import express from 'express';
import { getChannelProfile , getUserChannelWatchHistory} from '../../controllers/channel-controller.js';
import {verifyAuth} from '../../middlewares/auth-middleware.js'

const router = express.Router();

router.use(verifyAuth);


router.route("/profile/:username").get(getChannelProfile)
router.route("/watchhistory").get(getUserChannelWatchHistory)


export default router;