import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new schema

const curriculumSchema = new Schema ({
curriculumType: {
    type: String, required:true 
},
    user: {
        type: Types.ObjectId, ref: 'User', select:false}
},{
    timestamps:true
});


curriculumSchema.plugin(toJSON);
export const CurriculumType= model('curriculum', curriculumSchema);