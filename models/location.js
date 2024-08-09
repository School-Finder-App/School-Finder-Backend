import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new schema

const locationSchema = new Schema ({
location: {
    type: String , required:true 
},
    user: {
        type: Types.ObjectId, ref: 'User', select:false}
},{
    timestamps:true
});


locationSchema.plugin(toJSON);
export const Location= model('location', locationSchema);