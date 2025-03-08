import {SubsRepo} from '../repositories/index.js'


class SubscriptionService {

    constructor() {
        this.serviceRepo = new SubsRepo();
    }


}

export default SubscriptionService;

