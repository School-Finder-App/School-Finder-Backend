import joi from "joi";

export const userSchema = joi.object({
  
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  otherNames: joi.string(),
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
  userName: joi.string().required(),
  termsAndConditions: joi.boolean(),

});