import express from 'express';

import userRoutes from './user-route.js'
import videoRoutes from './video-route.js'
import tweetRoutes from './tweet-route.js'
import playlistRoutes from './playlist-route.js'

const router = express.Router();

router.use("/users", userRoutes);

router.use("/videos", videoRoutes);

router.use("/tweets", tweetRoutes);

router.use("/playlists", playlistRoutes);


export default router;
