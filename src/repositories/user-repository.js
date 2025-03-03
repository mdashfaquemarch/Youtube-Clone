import {CrudRepo} from './index.js'
import { User } from '../models/users-model.js'

class UserRepo extends CrudRepo {

    constructor() {
        super(User);
    }

    async checkUserExists(email, username) {
        try {
            const response = await User.findOne(
                {
                    $or: [{email: email}, {username: username}]
                }
            )
            return response;
        } catch (error) {
            console.error("Something went wrong in the UserRepo : checkUserExists");
             throw error;
        }
    } 

}

export default UserRepo;