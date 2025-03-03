import { StatusCodes } from "http-status-codes";
import {UserService} from '../services/index.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import fs from 'fs'
const userService = new UserService();

/*
   TODOD:
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
*/

const signup = asyncHandler(async (req, res) => {
  try {
    /*
        req.body -> username email password fullname
        validate all of them 
        check if user already exits -> username, email
        if exists then return response with user already exists
        req.files check for avatar and coverImage (optional)
        then upload avatar and coverImage to cloudinary and get urls 
        create user 
        check if user created or not
        then return response with successfully created user
    */

      const userData = req.body;
      const files = req.files;
      
      
     
      const response = await userService.signup(userData, files);
      
  
      return res
      .status(StatusCodes.CREATED)
      .json(new ApiResponse(
        200,
        response,
        "User signup successfully"
      ))

  } catch (error) {
      //  One-liner to delete uploaded files if an error occurs
      Object.values(req.files || {}).flat().forEach(file => fs.existsSync(file.path) && fs.unlinkSync(file.path));
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || "Something went wrong")
  }
});

const login = asyncHandler( async (req, res) => {
  try {
    
  } catch (error) {
    return res.staus(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "something went wrong",
      data: {},
      error: error,
    });
  }
});

const logout = async (req, res) => {
  try {
  } catch (error) {
    return res.staus(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "something went wrong",
      data: {},
      error: error,
    });
  }
};

export { signup, login };
