import { asyncHandler } from "../utils/asyncHandler.js"
import {VideoService} from "../services/index.js"
import { StatusCodes } from "http-status-codes";
import {ApiResponse} from '../utils/ApiResponse.js'

const videoService = new VideoService();

/*
✅ Search functionality 🔍 (filters videos based on title/description).
✅ Pagination support 📄 (fetch videos in pages).
✅ Sorting support 🔀 (sort by date, views, likes, etc.).
✅ User-specific filtering 👤 (get videos from a specific user).
*/

const getAllVideos = asyncHandler(async (req, res) => {
    //TODO: get all videos based on query, sort, pagination
    const { page = 1, limit = 10, query, sortBy = "createdAt", sortType = "desc", } = req.query;

       // Convert `page` & `limit` to numbers and validate them
    const pageNumber = Math.max(parseInt(page, 10), 1) || 1;
    const limitNumber = Math.max(parseInt(limit, 10), 1) || 10;


      // Prepare the search filter (for title/description)
      const searchFilter = query
          ? { 
              $or: [
                  { title: { $regex: query, $options: "i" } }, 
                  { description: { $regex: query, $options: "i" } }
              ] 
            }
          : {};

      // Filter videos by userId (if provided)
      if (userId) {
          searchFilter.userId = userId;
      }

      // ✅ Allowed sorting fields: `createdAt`, `views`, `likes`
      const allowedSortFields = ["createdAt", "views", "likes"];
      const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
      
      // Sorting order: "asc" (1) or "desc" (-1)
      const sortOrder = sortType === "asc" ? 1 : -1;
      const sortOptions = { [sortField]: sortOrder };

      const {videos, totalVideos} = await videoService.getAllVideos(searchFilter, sortOptions, pageNumber, limitNumber);

   
     return res.status(StatusCodes.OK).json(new ApiResponse(
        200,
        {
            totalVideos : totalVideos,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalVideos / limitNumber),
                totalVideos,
                hasNextPage: pageNumber * limitNumber < totalVideos,
                hasPrevPage: pageNumber > 1
            },
        },
        "videos fetched successfully"
     ));
})

const publishAVideo = asyncHandler(async (req, res) => {
    
    // TODO: get video, upload to cloudinary, create video
    /*
        - req.body -> validate 
        - check if user id is valid or not  
        - req.file -> upload video to cloudinary
        - if video not uploaded successfully return res
        - then create the create and check if created or not
        - and return the response
        
    */

     const videoData = req.body;
     const files = req.files;
     const user = req.user;
    /*
     console.log(files);
     console.log("```````````````")
     
     console.log(user);
     console.log("```````````````")
     console.log(videoData);
     console.log(`~~~~~~~~~~END OF controller~~~~~~~`)

     */
     const response = await videoService.publishAVideo(user, videoData, files);

     return res.status(StatusCodes.CREATED).json(new ApiResponse(
        StatusCodes.CREATED,
        response,
        "video uploded successfully"
    ));
     
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    //TODO: get video by id

    const response = await videoService.getVideoById(videoId);
    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "video by Id fetched successfully"
    ));
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

    const files = req.file;
    // console.log("Files in update controller", files);
    const updateDetails = req.body;
    // console.log("updateDetails", updateDetails);

    const response = await videoService.updateVideo(videoId, updateDetails, files);

    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "video updated successfully"
    ));

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
    const response = await videoService.deleteVideo(videoId);
    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "video deleted successfully"
    ));
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const response = await videoService.toggleStatusOfVideo(videoId);
    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "video toggle published status successfully"
    ));
})

/*
 - get video by Id -
 - it adds views to the video and add video to user watchHistory
 - response - channel subscriber avatar username channel is subscribed or not
 - resonse - video title decription thumbnail total like of video total views of video if video is liked or not
 - response - total comments comments with like if comments is liked or not 
*/
const getVideoByIdDetails = async (req, res) => {
    const {videoId} = req.params;
    const userId  = req.user?._id;
    const response = await videoService.getVideoDetails(videoId, userId);
    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "video By ID details fetched successfully"
    ));
};

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
    getVideoByIdDetails
}