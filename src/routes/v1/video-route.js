import express from "express";

import { publishAVideo } from "../../controllers/video-controller.js";
import validate from "../../middlewares/validate-middleware.js";
import { verifyAuth } from "../../middlewares/auth-middleware.js";
import { createVideoValue } from "../../utils/validators/video.js";
import { upload } from "../../middlewares/multer-middleware.js";

const router = express.Router();

router.use(verifyAuth); // Apply verifyJWT middleware to all routes in this file

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

export default router;
