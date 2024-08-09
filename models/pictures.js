import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new schema

const pictureSchema = new Schema ({
pictures: {
    type: String ,required:true 
},
    user: {
        type: Types.ObjectId, ref: 'User', select:false}
},{
    timestamps:true
});


pictureSchema.plugin(toJSON);
export const Pictures= model('picture', pictureSchema);