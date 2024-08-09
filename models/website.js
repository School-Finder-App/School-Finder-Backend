import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new schema

const websiteSchema = new Schema ({
websiteLink: {
    type: String 
},
    user: {
        type: Types.ObjectId, ref: 'User', select:false}
},{
    timestamps:true
});


websiteSchema.plugin(toJSON);
export const WebsiteLink= model('websitelink', websiteSchema);