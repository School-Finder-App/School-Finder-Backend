import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new schema

const appStatusSchema = new Schema ({
applicationStatus: {
    type: String , required:true  
},
    user: {
        type: Types.ObjectId, ref: 'User'}
},{
    timestamps:true
});


appStatusSchema.plugin(toJSON);
export const ApplicationStatus= model('applicationStatus', appStatusSchema);