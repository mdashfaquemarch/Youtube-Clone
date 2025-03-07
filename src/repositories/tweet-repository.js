import {CrudRepo} from "./index.js";
import {Tweet} from '../models/tweet-model.js'

class TweetRepo extends CrudRepo {

    constructor() {
        super(Tweet);
    }
}


export default TweetRepo;