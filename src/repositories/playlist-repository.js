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
}

export default PlayListRepo;