import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
import mongooseErrors from "mongoose-errors";


// create new Schema
const userSchema = new Schema({
    firstName: { type: String,required:true  },
    lastName: { type: String,required:true  },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required:true  },
    userName: { type: String, unique: true },
    // role:{type: String, default:'user',enum: ['superadmin', 'admin', 'manager', 'user']}
}, {
    timestamps: true

});


userSchema.plugin(toJSON);
userSchema.plugin(mongooseErrors)

export const User = model('User', userSchema)




//Reset Token //if you export it on the resetTokenSchema, it will only work for the schema not the model
const resetTokenSchema = new Schema({
    userId:{type: Types.ObjectId,required:true, ref:'User'},
    expired:{type:Boolean, default:false},
    expiresAt:{type:Date,
        default: () => new Date().setHours(new Date().getHours() + 2)}
}, {
        timestamps: true
    }
)


resetTokenSchema.plugin(toJSON);
resetTokenSchema.plugin(mongooseErrors)
//The reset token will have its own database id
export const ResetToken=model('resetToken', resetTokenSchema)




const unregisteredUser = new Schema({
    "nameOfSchool":{type: String, ref:"School"},
    "location":{type: String, ref:"Location"},
    "contact":{type: String, ref:"Contact"}
},{
    timestamps:true
});

unregisteredUser.plugin(toJSON);

export const UnofficialUser = model('unregisteredUser', unregisteredUser);
