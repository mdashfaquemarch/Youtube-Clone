import Joi from "joi";

const createTweetValue = Joi.object({
  content: Joi.string().trim().min(3).max(500).required(),
});


export {
    createTweetValue,
    
}