import joi from "joi";



export const vacancy = joi.object({
    vacancy:joi.string(),
    user: joi.string(),
});