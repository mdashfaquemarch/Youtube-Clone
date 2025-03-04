import express from 'express';

import userRoutes from './user-route.js'
import videoRoutes from './video-route.js'

const router = express.Router();

router.use("/users", userRoutes);

router.use("/videos", videoRoutes);


export default router;
