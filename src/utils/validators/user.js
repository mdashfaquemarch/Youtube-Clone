import Joi from "joi";

const signupValue = Joi.object({
  username: Joi.string().min(3).max(50).lowercase().required(),
  fullname: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(40).required()
});

const loginValue = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(40).required()
});


export {
    signupValue,
    loginValue
}