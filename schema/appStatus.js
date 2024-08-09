import joi from "joi";



export const appStatus = joi.object({
    applicationStatus:joi.string().required(),
    user: joi.string(),
});