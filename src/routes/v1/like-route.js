import express from 'express';
import {toggleVideoLike, toggleCommentLike, getLikedVideos, toggleTweetLike} from '../../controllers/like-controller.js'
import {verifyAuth} from '../../middlewares/auth-middleware.js'
const router = express.Router();

router.use(verifyAuth); // Apply verifyJWT middleware to all routes in this file


router.route("/toggle/v/:videoId").post(toggleVideoLike);
router.route("/toggle/c/:commentId").post(toggleCommentLike);
router.route("/toggle/t/:tweetId").post(toggleTweetLike);
router.route("/videos").get(getLikedVideos);


export default router;