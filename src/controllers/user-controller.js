import { StatusCodes } from "http-status-codes";
import {UserService} from '../services/index.js'


const userService = new UserService();

const signup = async (req, res) => {
  try {
    /*
        req.body -> username email password fullname
        validate all of them 
        check if user already exits -> username, email
        if exists then return response with user already exists
        req.files check for avatar and coverImage (optional)
        then upload avatar and coverImage to cloudinary and get urls 
        create user 
        check if user created or not
        then return response with successfully created user
    */

      const userData = req.body;
      const files = req.files;
      
      
     
      const response = await userService.signup(userData, files);
      
  
      return res
      .status(StatusCodes.CREATED)
      .json({
        message: files
      })

  } catch (error) {
    return res.staus(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "something went wrong",
      data: {},
      error: error,
    });
  }
};

const login = async (req, res) => {
  try {
  } catch (error) {
    return res.staus(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "something went wrong",
      data: {},
      error: error,
    });
  }
};

const logout = async (req, res) => {
  try {
  } catch (error) {
    return res.staus(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "something went wrong",
      data: {},
      error: error,
    });
  }
};

export { signup, login };
