import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new schema

const videoSchema = new Schema ({
videos: {
    type: Buffer, 
},
    user: {
        type: Types.ObjectId, ref: 'User', select:false}
},{
    timestamps:true
});


// title: {
//     type: String,
//     required: true,
//     minlength: 2
//   },
//   video: {
//     type: Buffer,
//     required: true
//   }

videoSchema.plugin(toJSON);
export const Videos= model('video', videoSchema);