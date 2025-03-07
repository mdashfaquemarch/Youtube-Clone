import express from 'express'
import { verifyAuth } from '../../middlewares/auth-middleware.js';
import validate from '../../middlewares/validate-middleware.js';
import { createTweetValue } from '../../utils/validators/tweet.js';
import { createTweet } from '../../controllers/tweet-controller.js';

const router = express.Router();

// auth required for all the routes
router.use(verifyAuth)

router.route("/create-tweet").post(validate(createTweetValue), createTweet);



export default router;