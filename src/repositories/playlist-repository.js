import {CrudRepo} from './index.js'
import {PlayList} from '../models/playlists-model.js'

class PlayListRepo extends CrudRepo {

    constructor() {
        super(PlayList)
    }

    async getPlaylistOfChannel(data, populateFields) {
        const response = await PlayList.find(data).populate(populateFields)

        return response;
    }

    async addVideoToPlayList(id, data) {
        const response = await PlayList.findByIdAndUpdate(id, data, {new : true});
        return response;
    }

    async deleteVideoFromPlayList(playlistId, videoId) {
        const response = await PlayList.findByIdAndUpdate(playlistId, {
            $pull: {
                videos: videoId
            }
        }, {new: true}).lean();
        return response;
    }

    async getPlayListById(playlistId) {
        const response = await PlayList.findById(playlistId)
        .populate({path: "videos", select: "title description videoFile thumbnail duration", populate: {
            path: "owner",
            select: "username avatar"
        }}).populate("owner", "username avatar").lean();

        return response;
    }

}

export default PlayListRepo;