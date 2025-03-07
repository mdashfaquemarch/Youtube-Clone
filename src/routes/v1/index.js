import express from 'express';

import userRoutes from './user-route.js'
import videoRoutes from './video-route.js'
import tweetRoutes from './tweet-route.js'

const router = express.Router();

router.use("/users", userRoutes);

router.use("/videos", videoRoutes);

router.use("/tweet", tweetRoutes);


export default router;
