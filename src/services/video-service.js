import { StatusCodes } from "http-status-codes";
import { VideoRepo } from "../repositories/index.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary-util.js";


class VideoService {

    constructor() {
        this.videoRepo = new VideoRepo();
    }

    async publishAVideo(user, videoData, files) {
      
     console.log(files);
     console.log("```````````````")
     
     console.log(user);
     console.log("```````````````")
     console.log(videoData);
      const videoLocalPath = files?.videoFile?.[0].path || null;
      const thumnailLocalPath = files?.thumbnail?.[0].path || null;

       console.log(`videoLocalpath: ${videoLocalPath}`);
       console.log(`thumbnailLocalpath: ${thumnailLocalPath}`);
      if(!videoLocalPath) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "videoFile is required");
      }

      if(!thumnailLocalPath) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "thumnail file is required");
      }

      const video = await uploadOnCloudinary(videoLocalPath);

      if(!video) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went while uploading the video file on cloudinary");
      }

      const thumbnail = await uploadOnCloudinary(thumnailLocalPath);

      if(!thumbnail) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went while uploading the thumbnail file on cloudinary");
      }

      const createdVideo = await this.videoRepo.create({
        title: videoData.title,
        description: videoData.description,
        videoFile: video.url,
        thumbnail: thumbnail.url,
        duration: video.duration,
        owner: user._id
      })

      if(!createdVideo) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went while creating the video!");
      }

      return createdVideo;
    }

    async updateVideo(id, data) {

    }

    async deleteVideo(id) {

    }

    async getVideoById(id) {

    }

    async getAllVideo() {

    }
}

export default VideoService;