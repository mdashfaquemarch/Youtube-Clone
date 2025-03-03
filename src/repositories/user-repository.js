import {CrudRepo} from './index.js'
import { User } from '../models/users-model.js'

class UserRepo extends CrudRepo {

    constructor() {
        super(User);
    }

}

export default UserRepo;