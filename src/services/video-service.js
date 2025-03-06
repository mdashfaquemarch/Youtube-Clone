import { StatusCodes } from "http-status-codes";
import { VideoRepo } from "../repositories/index.js";
import { ApiError } from "../utils/ApiError.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary-util.js";
import mongoose, { isValidObjectId } from "mongoose";
import fs from "fs";
import { getCloudinaryPublicId } from "../utils/getPublicIdCloudinary.js";

class VideoService {
  constructor() {
    this.videoRepo = new VideoRepo();
  }

  async publishAVideo(user, videoData, files) {
    console.log(files);
    console.log("```````````````");

    console.log(user);
    console.log("```````````````");
    console.log(videoData);
    const videoLocalPath = files?.videoFile?.[0].path || null;
    const thumnailLocalPath = files?.thumbnail?.[0].path || null;

    console.log(`videoLocalpath: ${videoLocalPath}`);
    console.log(`thumbnailLocalpath: ${thumnailLocalPath}`);
    if (!videoLocalPath) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "videoFile is required");
    }

    if (!thumnailLocalPath) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "thumnail file is required");
    }

    const video = await uploadOnCloudinary(videoLocalPath);

    if (!video) {
      fs.unlinkSync(thumnailLocalPath);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went while uploading the video file on cloudinary"
      );
    }

    const thumbnail = await uploadOnCloudinary(thumnailLocalPath);

    if (!thumbnail) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went while uploading the thumbnail file on cloudinary"
      );
    }

    const createdVideo = await this.videoRepo.create({
      title: videoData.title,
      description: videoData.description,
      videoFile: video.url,
      thumbnail: thumbnail.url,
      duration: video.duration,
      owner: user._id,
    });

    if (!createdVideo) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went while creating the video!"
      );
    }

    return createdVideo;
  }

  async updateVideo(id, data, file) {

    if (!isValidObjectId(id)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid videoId");
    }

    const video = await this.videoRepo.get(id);
    if (!video) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Video not found");
    }

    const updateFields = {};
    if (data.title) updateFields.title = data.title;
    if (data.description) updateFields.description = data.description;

    if (file) {
      // Upload new thumbnail
      const uploadedThumbnail = await uploadOnCloudinary(file.path);
      if (!uploadedThumbnail) {
        throw new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Error uploading thumbnail to Cloudinary"
        );
      }
      updateFields.thumbnail = uploadedThumbnail.url;

      // Delete old thumbnail (if exists) in parallel
      if (video.thumbnail) {
        const publicId = getCloudinaryPublicId(video.thumbnail);
        console.log("Deleting Old Thumbnail - Public ID:", publicId);

        const deletedThumnail = await deleteFromCloudinary(publicId);
        if(!deletedThumnail) {
          throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error while deleting the old thumbnail")
        }
      }
    }

    // If no fields were provided to update, return the existing video
    if (Object.keys(updateFields).length === 0) return video;

    // Update the video
    const updatedVideo = await this.videoRepo.update(id, updateFields);
    if (!updatedVideo) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error updating the video"
      );
    }

    return updatedVideo;
  }

  async deleteVideo(id) {
    if (!isValidObjectId(id)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid videoId");
    }

    const video = await this.videoRepo.get(id);

    if (!video) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Video not found");
    }

    const response = await this.videoRepo.destroy(id);

    if (!response) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to delete the video by Id"
      );
    }

    return response;
  }

  async getVideoById(id) {
    if (!isValidObjectId(id)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid videoId");
    }

    const video = await this.videoRepo.get(id);
    if (!video) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Video not found");
    }

    const response = await this.videoRepo.getVideoById(video._id);
    if (!response) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to get video by Id"
      );
    }
    return response;
  }

  /*
✅ Search functionality 🔍 (filters videos based on title/description).
✅ Pagination support 📄 (fetch videos in pages).
✅ Sorting support 🔀 (sort by date, views, likes, etc.).
✅ User-specific filtering 👤 (get videos from a specific user).
*/

  async getAllVideos(searchFilter, sortOptions, pageNumber, limitNumber) {
    const {videos, totalVideos} = await this.videoRepo.getAllVideosWithQuery(searchFilter, sortOptions, pageNumber, limitNumber);
    return {videos, totalVideos};
  }

  async toggleStatusOfVideo(id) {
    if (!isValidObjectId(id)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid VideoId");
    }

    const video = await this.videoRepo.get(id);
    if (!video) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Video not found");
    }

    const statusUpdated = await this.videoRepo.update(id, {
      $set: {
        isPublished: !video.isPublished,
      },
    });

    if (!statusUpdated) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to update video status"
      );
    }

    return statusUpdated;
  }
}

export default VideoService;
