import {CrudRepo} from './index.js'
import {PlayList} from '../models/playlists-model.js'

class PlayListRepo extends CrudRepo {

    constructor() {
        super(PlayList)
    }

    async getChannelPlaylist(data) {
        const response = await PlayList.find(data)

        return response;
    }

    async addVideoToPlayList(id, data) {
        const response = await PlayList.findByIdAndUpdate(id, data, {new : true});
        return response;
    }

    async deleteVideoFromPlayList(playlistId, videoId) {
        const response = await PlayList.findByIdAndDelete(playlistId, {
            $pull: {
                videos: videoId
            }
        })
        return response;
    }
}

export default PlayListRepo;