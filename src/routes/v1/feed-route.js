import express from 'express';
import { getFeed, trendingVideos } from '../../controllers/feed-controller.js';


const router = express.Router();


router.route("/").get(getFeed)
router.route("/trending-videos").get(trendingVideos)


export default router;