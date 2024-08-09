import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new schema

const facebookSchema = new Schema ({
facebookLink: {
    type: String 
},
    user: {
        type: Types.ObjectId, ref: 'User', select:false}
},{
    timestamps:true
});


facebookSchema.plugin(toJSON);
export const FacebookLink= model('facebookLink', facebookSchema);