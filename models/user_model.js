import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new Schema
const userSchema = new Schema({
    firstName: { type: String,required:true  },
    lastName: { type: String,required:true  },
    otherNames: { type: String },
    email: { type: String, required: true, unique: true, },
    password: { type: String,required:true  },
    userName: { type: String, unique: true },
    termsAndconditions: { type: String }
}, {
    timestamps: true

});


userSchema.plugin(toJSON);

export const User = model('User', userSchema)
