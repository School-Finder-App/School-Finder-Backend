import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new schema

const vacancySchema = new Schema ({
vacancy: {
    type: String 
},
    user: {
        type: Types.ObjectId, ref: 'User', select:false}
},{
    timestamps:true
});


vacancySchema.plugin(toJSON);
export const Vacancy= model('vacancy', vacancySchema);