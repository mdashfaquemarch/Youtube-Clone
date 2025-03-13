import express from 'express';
import {createPlaylist, getPlaylistById, 
    getUserPlaylists, addVideoToPlaylist, 
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
} from '../../controllers/playlist-controller.js'
import { verifyAuth } from '../../middlewares/auth-middleware.js';

const router = express.Router();


router.use(verifyAuth);

// Create a new playlist

router.route("/").post(createPlaylist)

// Get all playlists of a user
router.route("/user/:userId").get(getUserPlaylists);


// router.route("/channel/:channelId").get(getChannelPlaylists); // ✅ Get all playlists of a specific channel


// Get a specific playlist || Update playlist details || Delete a playlist

router.route("/:playlistId").get(getPlaylistById).put(updatePlaylist).delete(deletePlaylist)

// Add a video to a playlist || Remove a video from a playlist
// router.route("/:playlistId/videos/:videoId").post(addVideoToPlaylist).delete(removeVideoFromPlaylist)

router.route("/add/:videoId/:playlistId").post(addVideoToPlaylist);
router.route("/remove/:videoId/:playlistId").delete(removeVideoFromPlaylist);


export default router;