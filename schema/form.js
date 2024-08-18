import joi from "joi";


export const formSchema = joi.object({
        nameOfSchool: joi.string(),
        location: joi.string(),
        contact: joi.string(),
        curriculumType: joi.string(),
        applicationStatus: joi.string().valid('open', 'closed'),
        pictures: joi.string(),
        videos: joi.string(),
        facebookLink: joi.string(),
        whatsAppLink: joi.string(),
        instagramLink: joi.string(),
        websiteLink: joi.string(),
        vacancy: joi.string(),
        user: joi.string()

});