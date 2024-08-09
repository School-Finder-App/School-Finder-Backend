import { model, Types, Schema } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";



const schoolSchema = new Schema({
    nameOfSchool: {
        type: String, required: true
    },
    user: {
        type: Types.ObjectId, ref: 'User', select: false
    }
}, {
    timestamps: true
});


schoolSchema.plugin(toJSON);

export const School = model('nameOfSchool', schoolSchema)
