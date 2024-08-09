import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new schema

const whatsAppSchema = new Schema ({
whatsAppLink: {
    type: String 
},
    user: {
        type: Types.ObjectId, ref: 'User', select:false}
},{
    timestamps:true
});


whatsAppSchema.plugin(toJSON);
export const WhatsAppLink= model('whatsAppLink', whatsAppSchema);