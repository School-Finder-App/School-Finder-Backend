import joi from "joi";



export const location = joi.object({
    location:joi.string().required(),
    user: joi.string(),
});