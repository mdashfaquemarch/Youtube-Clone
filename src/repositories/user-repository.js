import {CrudRepo} from './index.js'
import { User } from '../models/users-model.js'
import { ApiError } from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';

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
             throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || "Something went wrong");
        }
    } 

}

export default UserRepo;