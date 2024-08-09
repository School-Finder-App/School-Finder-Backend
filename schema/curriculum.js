import joi from "joi";



export const curriculum = joi.object({
    curriculumType:joi.string().required(),
    user: joi.string(),
});