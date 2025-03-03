import { User } from "../models/users-model.js";
import { StatusCodes } from "http-status-codes";

const signup = async (req, res) => {
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
