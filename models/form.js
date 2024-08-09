import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";



// create new Schema
const formModel = new Schema({
    nameOfSchool: { type: String, required:true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    curriculumType: { type: String, required: true },
    applicationStatus: { type: String, enum:[ 'open ', 'closed'], required:true},
    pictures: { type: String, required:true},
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