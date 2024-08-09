import joi from "joi";

export const formSchema = joi.object({

        nameOfSchool:joi.string().required(),
        location:joi.string().required(),
        curriculumType:joi.string().required(),
        applicationStatus:joi.string().required().valid('open','closed'),
        pictures:joi.string().required(),
        videos:joi.string(),
        facebookLink:joi.string(),
        whatsAppLink:joi.string(),
        instagramLink:joi.string(),
        websiteLink:joi.string(),
        vacancy:joi.string(),
        user:joi.string()
   
});