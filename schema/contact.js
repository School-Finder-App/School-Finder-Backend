import joi from "joi";



export const contact = joi.object({
    contact:joi.string().required(),
    user: joi.string(),
});