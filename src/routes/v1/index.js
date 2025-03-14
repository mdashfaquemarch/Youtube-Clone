import express from 'express';

import userRoutes from './user-route.js'
import videoRoutes from './video-route.js'
import tweetRoutes from './tweet-route.js'
import playlistRoutes from './playlist-route.js'
import subscriptionRoutes from './subscription-route.js'
import likeRoutes from './like-route.js'

const router = express.Router();

router.use("/users", userRoutes);

router.use("/videos", videoRoutes);

router.use("/tweets", tweetRoutes);

router.use("/playlists", playlistRoutes);

router.use("/subscriptions", subscriptionRoutes);

router.use("/likes" , likeRoutes);


export default router;
