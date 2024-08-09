import joi from "joi";



export const facebook = joi.object({
    facebookLink:joi.string(),
    user: joi.string(),
});