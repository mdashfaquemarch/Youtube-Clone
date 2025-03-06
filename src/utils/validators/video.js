import Joi from "joi";

const createVideoValue = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(1000).required(),
});

const updateVideoValue = Joi.object({
    title: Joi.string().min(0).max(100),
    description: Joi.string().min(0).max(1000),
});




export {
    createVideoValue,
    updateVideoValue,
}