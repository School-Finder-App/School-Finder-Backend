import joi from "joi";




export const schools = joi.object({
    nameOfSchool:joi.string().required(),
    user: joi.string(),
});