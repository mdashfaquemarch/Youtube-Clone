import express from 'express';
import {signup, login, logout} from '../../controllers/user-controller.js'
import validate from '../../middlewares/validate-middleware.js';
import { upload } from '../../middlewares/multer-middleware.js';
import { verifyAuth } from '../../middlewares/auth-middleware.js'
import {signupValue, loginValue} from '../../utils/validators/user.js'

const router = express.Router();



router.route("/signup").post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]),validate(signupValue), signup);


router.route("/login").post(validate(loginValue), login);

router.route("/logout").post(verifyAuth, logout);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);

router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/update-cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);


export default router;