import { StatusCodes } from "http-status-codes"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { config } from "../config/server-config.js";
import { User } from "../models/users-model.js";

export const verifyAuth = asyncHandler( async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        // console.log(token);
        if (!token) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if(!user) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid Access Token")
        }
        req.user = user;
        next()

    } catch (error) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid Access Token");
    }
})