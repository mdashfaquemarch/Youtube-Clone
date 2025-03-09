import { StatusCodes } from "http-status-codes";
import { PlayListRepo, UserRepo, VideoRepo } from "../repositories/index.js";
import { ApiError } from "../utils/ApiError.js";
import { isValidObjectId } from "mongoose";

class PlayListService {
  constructor() {
    this.playlistRepo = new PlayListRepo();
    this.userRepo = new UserRepo();
    this.videoRepo = new VideoRepo();
  }

  async createPlaylist(name, description, userId) {
    if (!userId._id) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "user is not authenticated");
    }

    const createPlaylist = await this.playlistRepo.create({
      name: name,
      description: description,
      owner: userId._id,
    });

    if (!createPlaylist) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong while creating the playlist"
      );
    }

    return createPlaylist;
  }

  async getUserPlaylists(username) {
    const user = await this.userRepo.findOnlyOne({ username: username });

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    const userPlaylists = await this.playlistRepo.channelPlaylist({
      owner: user._id,
    });

    return userPlaylists;
  }

  async getPlaylistById(playlistId) {
    const playlist = await this.playlistRepo.get(playlistId);

    if (!playlist) {
      throw new ApiError(StatusCodes.NOT_FOUND, "playlist not found");
    }

    return playlist;
  }

  async addVideoToPlaylist(playlistId, videoId) {
    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
      throw new ApiError();
    }

    const video = await this.videoRepo.get(videoId);

    if (!video) {
      throw new ApiError();
    }

    const playlist = await this.playlistRepo.get(playlistId);

    if (!playlist) {
      throw new ApiError();
    }

    const result = await this.playlistRepo.addVideoToPlayList(playlistId, {
      $addToSet: { videos: videoId },
    });

    return result;
  }

  async removeVideoFromPlaylist(playlistId, videoId) {

    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
      throw new ApiError();
    }

    const video = await this.videoRepo.get(videoId);

    if (!video) {
      throw new ApiError();
    }

    const playlist = await this.playlistRepo.get(playlistId);

    if (!playlist) {
      throw new ApiError();
    }

  }

  async deletePlaylist(playlistId) {
    if (isValidObjectId(playlist)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "invalid playlist");
    }

    const playlist = await this.playlistRepo.get(playlistId);

    if (!playlist) {
      throw new ApiError(StatusCodes.NOT_FOUND, "playlist not found");
    }
    const response = await this.playlistRepo.destroy(playlistId);

    return response;
  }

  async updatePlaylist(playlistId, data) {}
}

export default PlayListService;
