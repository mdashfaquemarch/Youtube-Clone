import Joi from "joi";

const createVideoValue = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(1000).required(),
});

const loginValue = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(40).required()
});


export {
    createVideoValue,
    loginValue
}