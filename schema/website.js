import joi from "joi";



export const website = joi.object({
    websiteLink:joi.string(),
    user: joi.string(),
});