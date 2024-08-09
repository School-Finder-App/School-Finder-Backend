import joi from "joi";





export const videos = joi.object({
   videos:joi.binary(),
//    keys({
//     buffer: joi.binary().required(),
    // mimetype: joi.string().valid('video/mp4', 'video/quicktime', 'video/x-msvideo').required(),
//   }).required(),
    user: joi.string(),
});