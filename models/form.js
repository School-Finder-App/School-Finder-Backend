import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";



// create new Schema
const formModel = new Schema({
    nameOfSchool: { type: String },
    location: { type: String},
    contact: { type: String },
    curriculumType: { type: String},
    applicationStatus: { type: String, enum:['open ', 'closed']},
    pictures: { type: String},
    videos: { type: String },
    facebookLink: { type: String },
    whatsAppLink: { type: String },
    instagramLink: { type: String },
    websiteLink: { type: String },
    vacancy: { type: String }
}, {
    timestamps: true
});


formModel.plugin(toJSON);

export const Form = model('Form', formModel)