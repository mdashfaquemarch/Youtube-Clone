import { StatusCodes } from "http-status-codes";
import { UserService } from "../services/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import fs from "fs";
import { config } from "../config/server-config.js";
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
    .json(new ApiResponse(200, response, "User signup successfully"));

});

const login = asyncHandler(async (req, res) => {

  /*
      req.body validate -> email password
      find user based on email
      if not found in db return response please register first
      if user found in db then
      check password
      create a accessToken and refreshToken
      set cookie for accesstoken and refreshtoken
      return response
  */

  const userData = req.body;

  const { loggedInUser, accessToken, refreshToken } = await userService.login(
    userData
  );
  //  cookie options

  const options = {
    httpOnly: true,
    secure: config.NODE_ENV === "development" ? false : true,
  };

  return res
    .status(StatusCodes.OK)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In successfully"
      )
    );


});

const logout = asyncHandler(async (req, res) => {
    // console.log(req.user);
    const logout = await userService.logout(req.user);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(StatusCodes.OK)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(StatusCodes.OK, {}, "User logged Out"));

});

export { signup, login, logout };
