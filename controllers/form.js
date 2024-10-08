import { formSchema } from "../schema/form.js";
import {Form} from "../models/form.js";
import { User } from "../models/user_model.js";
import mongoose from "mongoose";




export const getForms = async (req, res, next) => {
  try {
      //Get query params 
      const { 
          limit = 10, 
          skip = 0,  
          filter = "{}", 
          fields = "{}",
          sort = '{}'
       } = req.query;   //filter



      //Get all categories from database
      const allForms = await Form
          .find(JSON.parse(filter))
          .select(JSON.parse(fields))                  //filter
          .limit(limit) //limit (limit|| 10)defaults the limit to ten
          .skip(skip);
      //Return response
      res.status(200).json(allForms);
  } catch (error) {
      next(error);
  }
}





//Get one form
export const getForm = async (req, res, next) => {
  try {

    // Ensure MongoDB connection is established
    if (!mongoose.connection.readyState) {
      throw new Error('MongoDB connection not established');
    }
    //Get one form by id
    const getOneForm = await Form.findById(req.params.id).select('nameOfSchool location applicationStatus');
    // console.log(getOneForm)
    res.status(201).json({message:'This is a limited version',getOneForm });

    // Get the user from the request (assuming you're using a middleware to authenticate users)
    // const user = req.user;
    const user = req.session?.user?.id || req?.user?.id;

    // Check if the user is registered and found in the database
    if (!user) {
      return res.status(401).json({message:'Unauthorized'});
    } else{
      // Get one form by id
        const getFullForm = await Form.findById(req.params.id)
       console.log(getFullForm);
    }
  
    //Return a response
    // res.status(200).json(getOneForm)
  } catch (error) {
    next(error);
  }
}





//Post a form
export const postForms = async (req, res, next) => {
  try {
    const { error, value } = formSchema.validate(req.body)
    console.log(req.body)

    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const form = await Form.create({ ...value, user: userSessionId });
    await form.save();

    //the forms over here is the one that will be located in the the model that the user will receive
    // user.forms.push(form.id)

    await user.save();

    res.status(201).json({message:"Form has been received", form});
  } catch (error) {
    next(error)
  }
};




//Update forms
export const patchForms = async (req, res, next) => {
  try {
    //update forms by id: This id will be the special one for school owners
    const updateForms = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true});

    //return response
    res.status(200).json({message:"Form has been updated", updateForms});
  } catch (error) {
    next(error);
  }
};



//Delete a form: This should be accessible to both the admin and school owners
export const deleteForm = async (req, res, next) => {
  try {

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found")
    }
    //Delete a skill by id
    const deleteOneSkill = await Form.findByIdAndDelete(req.params.id)

    //return response
    if (!deleteOneSkill) {
      res.status(200).send("Form not found")
    }

    user.forms.pull(req.params.id);
    await user.save();
    res.status(200).json("Form deleted");

  } catch (error) {
    return res.status(500).json({ error })
  }
};



