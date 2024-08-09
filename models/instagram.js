import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new schema

const instagramSchema = new Schema ({
instagramLink: {
    type: String 
},
    user: {
        type: Types.ObjectId, ref: 'User', select:false}
},{
    timestamps:true
});


instagramSchema.plugin(toJSON);
export const InstagramLink= model('instagramLink', instagramSchema);