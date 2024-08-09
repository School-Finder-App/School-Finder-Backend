import joi from "joi";



export const pictures = joi.object({
    pictures:joi.string().required(),
    user: joi.string()
});