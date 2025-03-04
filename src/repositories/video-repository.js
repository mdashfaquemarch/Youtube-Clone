import {CrudRepo} from './index.js';
import {Video} from '../models/videos-model.js';

class VideoRepo extends CrudRepo {
    constructor() {
        super(Video)
    }

}

export default VideoRepo;