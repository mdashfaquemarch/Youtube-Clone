import { UserRepo } from "../repositories/index.js";
import { uploadOnCloudinary } from "../utils/cloudinary-util.js";
import { ApiError } from "../utils/ApiError.js";
import { StatusCodes } from "http-status-codes";

class UserService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async signup(userData, files) {

    // checking if user exists or not

    const existedUser = await this.userRepo.checkUserExists(
      userData.email,
      userData.username
    );

    if (existedUser) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        "User already exits with this email or username"
      );
    }

    let avatarLocalPath = files?.avatar?.[0].path || null;
    let coverImageLocalPath = files?.coverImage?.[0].path || null;

    if (!avatarLocalPath) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Avatar file is required!");
    }

    // upload avatar on Cloudinary

    let avatar = null;
    if (avatarLocalPath) {
      const avatarFile = files.avatar[0];
      if (!avatarFile.mimetype.startsWith("image/")) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "Only image files are allowed for avatar."
        );
      }

      try {
        avatar = await uploadOnCloudinary(avatarLocalPath);
      } catch (error) {
        throw new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Error while uploading avatar on Cloudinary"
        );
      }
    }

    // upload avatar on Cloudinary

    let coverImage = null;
    if (coverImageLocalPath) {
      const coverImageFile = files.coverImage[0];
      if (!coverImageFile.mimetype.startsWith("image/")) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "Only image files are allowed for coverImage."
        );
      }

      try {
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
      } catch (error) {
        throw new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Error while uploading coverImage on Cloudinary"
        );
      }
    }

    if (!avatar.url) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Avatar file is required");
    }

    const user = await this.userRepo.create({
      username: userData.username.toLowerCase(),
      email: userData.email,
      password: userData.password,
      fullname: userData.fullname,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
    });

    const createdUser = await this.userRepo.get(user._id);

    if (!createdUser) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong while registering the user"
      );
    }

    return createdUser;

  }

  async login(userData) {
    const user = await this.userRepo.findOnlyOne({ email: userData.email });

    if (!user) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        "User not registered. Please sign up first."
      );
    }
    console.log(user.isPasswordCorrect(userData.password));
    const isPasswordValid = await user.isPasswordCorrect(userData.password);

    if (!isPasswordValid) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid credentials.");
    }

    const accessToken = await user.generateAccessToken();

    if (!accessToken) {
      throw new ApiError(
        500,
        "Something went wrong while generating  access token"
      );
    }

    const refreshToken = await user.generateRefreshToken();

    if (!refreshToken) {
      throw new ApiError(
        500,
        "Something went wrong while generating referesh token"
      );
    }

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const loggedInUser = await this.userRepo.getUser(user._id);

    return { loggedInUser, accessToken, refreshToken };
  }

  async logout(user) {

    const logout = await this.userRepo.update(user?._id, {
      $set: {
        refreshToken: "",
      },
    });

    if(!logout) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "something went wrong while logging out");
    }
    return logout;
  }
}

export default UserService;
