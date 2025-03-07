import Joi from "joi";

const signupValue = Joi.object({
  username: Joi.string().trim().min(3).max(50).lowercase().required(),
  fullname: Joi.string().trim().min(3).max(50).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(4).max(40).required()
});

const loginValue = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(4).max(40).required()
});


export {
    signupValue,
    loginValue
}