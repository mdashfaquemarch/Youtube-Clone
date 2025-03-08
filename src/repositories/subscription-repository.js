import { Subscription } from '../models/subscriptions-model.js'
import {CrudRepo} from './index.js'

class SubsRepo extends CrudRepo{

    constructor() {
        super(Subscription)
    }

    // findOneAndDelete
    async getOneAndDelete(data) {
        const response = await Subscription.findOneAndDelete(data);
        return response;
    }

    async getChannelInfo(data, fields) {
        const response = await Subscription.find(data).populate();;
        return response;
    }
    
}

export default SubsRepo;