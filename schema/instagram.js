import joi from "joi";



export const instagram = joi.object({
    instagramLink:joi.string(),
    user: joi.string(),
});