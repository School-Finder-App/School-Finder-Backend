import joi from "joi";



export const whatsApp= joi.object({
    whatsAppLink:joi.string().required(),
    user: joi.string(),
});