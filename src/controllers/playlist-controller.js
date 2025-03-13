import mongoose, {isValidObjectId} from "mongoose"
import {asyncHandler} from "../utils/asyncHandler.js"
import {PlayListService} from '../services/index.js';
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from '../utils/ApiResponse.js';

const playlistService = new PlayListService();

const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body;
    const userId = req.user;
    //TODO: create playlist
    const response = await  playlistService.createPlaylist(name, description, userId);

    return res.status(StatusCodes.CREATED).json(new ApiResponse(
        StatusCodes.CREATED,
        response,
        "playlist Created successfully"
    ));
})

const getChannelPlaylists = asyncHandler(async (req, res) => {
    const {channelId} = req.params;
    //TODO: get channel playlists
    const response = await  playlistService.getChannelPlaylists(channelId);

    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "channel playlist fetched successfully"
    ));
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params;
    //TODO: get playlist by id
    const response = await  playlistService.getPlaylistById(playlistId);

    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "playList by ID fetched successfully"
    ));
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params;
    const response = await  playlistService.addVideoToPlaylist(playlistId, videoId);

    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "video added to the playlist"
    ));
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params;
    // TODO: remove video from playlist
    const response = await  playlistService.removeVideoFromPlaylist(playlistId, videoId);

    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "video removed  from the playlist"
    ));

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params;
    // TODO: delete playlist
    const response = await  playlistService.deletePlaylist(playlistId);

    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "playlist deleted successfully"
    ));
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params;
    const playlistData = req.body; // name description 
    //TODO: update playlist
    const response = await  playlistService.updatePlaylist(playlistId, playlistData);
    return res.status(StatusCodes.OK).json(new ApiResponse(
        StatusCodes.OK,
        response,
        "playlist updated successfully"
    ));
})

export {
    createPlaylist,
    getChannelPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}