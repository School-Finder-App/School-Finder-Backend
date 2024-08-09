import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new schema

const contactSchema = new Schema ({
contact: {
    type: String ,required:true 
},
    user: {
        type: Types.ObjectId, ref: 'User', select:false}
},{
    timestamps:true
});


contactSchema.plugin(toJSON);

export const Contact= model('contact', contactSchema);