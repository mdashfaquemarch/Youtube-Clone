import { asyncHandler } from "../utils/asyncHandler.js"
import {VideoService} from "../services/index.js"
import { StatusCodes } from "http-status-codes";

const videoService = new VideoService();

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
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

     console.log(files);
     console.log("```````````````")
     
     console.log(user);
     console.log("```````````````")
     console.log(videoData);
     console.log(`~~~~~~~~~~END OF controller~~~~~~~`)
     const response = await videoService.publishAVideo(user, videoData, files);

     return res.status(StatusCodes.CREATED).json(response);
     
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id

    const response = await videoService.getVideoById(videoId);
    return res.status(StatusCodes.OK).json(response);
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

    const files = req.file;
    console.log("Files in update controller", files);
    const updateDetails = req.body;
    console.log("updateDetails", updateDetails);

    const response = await videoService.updateVideo(videoId, updateDetails, files);

    return res.status(StatusCodes.OK).json(response);

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
    const response = await videoService.deleteVideo(videoId);
    return res.status(StatusCodes.OK).json(response);
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const response = await videoService.getVideoById(videoId);
    return res.status(StatusCodes.OK).json(response);
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}