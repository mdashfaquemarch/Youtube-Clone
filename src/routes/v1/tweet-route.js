import express from 'express'
import { verifyAuth } from '../../middlewares/auth-middleware.js';
import validate from '../../middlewares/validate-middleware.js';
import { createTweetValue } from '../../utils/validators/tweet.js';
import { createTweet, deleteTweet, getUserTweets, updateTweet } from '../../controllers/tweet-controller.js';

const router = express.Router();

// auth required for all the routes
router.use(verifyAuth)

router.route("/").post(validate(createTweetValue), createTweet);
router.route("/user/:userId").get(getUserTweets);
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);


export default router;