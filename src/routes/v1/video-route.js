import express from "express";

import { publishAVideo, getVideoById , deleteVideo, updateVideo, togglePublishStatus, getAllVideos, getVideoByIdDetails} from "../../controllers/video-controller.js";
import validate from "../../middlewares/validate-middleware.js";
import { verifyAuth } from "../../middlewares/auth-middleware.js";
import { createVideoValue, updateVideoValue} from "../../utils/validators/video.js";
import { upload } from "../../middlewares/multer-middleware.js";

const router = express.Router();

// Apply verifyJWT middleware to all routes in this file

router.use(verifyAuth); 

router.route("/publish-video").post(
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  validate(createVideoValue),
  publishAVideo
);

router.route("/:videoId")
.get(getVideoByIdDetails)
.delete(deleteVideo);

router.route("/update-video/:videoId")
.put(upload.single("thumbnail"),validate(updateVideoValue), updateVideo);

router.route("/toggle-publish/video/:videoId")
.patch(togglePublishStatus);

router.route("/").get(getAllVideos);

export default router;
