import { UserRepo } from "../repositories/index.js";

class UserService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async signup(data) {
    try {

    } catch (error) {
      console.error("Something went wrong in the UserService : signup");
      throw error;
    }
  }

  async login(data) {
    try {
    } catch (error) {
      console.error("Something went wrong in the UserService : login");
      throw error;
    }
  }
}

export default UserService;
