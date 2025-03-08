import { Subscription } from '../models/subscriptions-model.js'
import {CrudRepo} from './index.js'

class SubsRepo extends CrudRepo{

    constructor() {
        super(Subscription)
    }

    // findOneAndDelete
    async getOneAndDelte(data) {
        const response = await Subscription.findOneAndDelete(data);
        return response;
    }
    
}

export default SubsRepo;