import {CrudRepo} from './index.js'
import {PlayList} from '../models/playlists-model.js'

class PlayListRepo extends CrudRepo {

    constructor() {
        super(PlayList)
    }

    async channelPlaylist(data) {
        const response = await PlayList.find(data)

        return response;
    }

    async addVideoToPlayList(id, data) {
        const response = await PlayList.findByIdAndUpdate(id, data, {new : true});
        return data;
    }
}

export default PlayListRepo;