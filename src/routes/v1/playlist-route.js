import express from 'express';


const router = express.Router();

// Create a new playlist

router.route("/").post()

// Get all playlists of a user
router.route("/:username").get()


// Get a specific playlist || Update playlist details || Delete a playlist

router.route("/:playlistId").get().put().delete()

// Add a video to a playlist || Remove a video from a playlist
router.route("/:playlistId/videos/:videoId").post().delete()


export default router;