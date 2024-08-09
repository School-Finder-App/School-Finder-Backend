import { User } from "../models/user_model.js";
import { Pictures } from "../models/pictures.js";
import {pictures} from "../schema/pictures.js"


export const postPicture = async (req, res) => {
  try {
    const { error, value } = pictures.validate({
      // ...req.body,
      // pictures: req.files?.pictures[0].filename,
      ...req.body,
      pictures: req.files.filename,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user.id;
   

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const addPicture = await Pictures.create({ ...value, user: userId });

    // user.Pictures = addPicture._id;

    await user.save();

    res.status(201).json({message:"Picture has been added",addPicture});
  } catch (error) {
    console.log(error);
  }
};



  // controller to get user pictures
export const getUserPictures = async (req, res, next) => {
    try {
      const allPictures = await pictures.find();
      res.status(200).json(allPictures);
    } catch (error) {
      next(error)
    }
  };






  export const patchPicture = async (req, res, next) => {
    try {
      const { error, value } = pictures.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const updatedPicture = await Pictures.findByIdAndUpdate(
        req.params.userId,
        value,
        { new: true }
      );
  
      if (!updatedPicture) {
        return res.status(404).send('Pictures not found');
      }
  
      res.status(200).json({ message:"Pictures have been updated.", updatedPicture});
    } catch (error) {
      next(error)
    }
  };


  // Delete a picture
export const deletePicture = async (req, res, next) => {
    try {
      const deleteAPicture = await Pictures.findByIdAndDelete(req.params.userProfileId);
  
      if (!deleteAPicture) {
        return res.status(404).send('Picture not found');
      }
  
      // Remove user profile reference from user
      const user = await User.findById(deleteAPicture.user);
      if (user) {
        user.Pictures = null;
        await user.save();
      }
  
      res.status(200).json(deleteAPicture);
    } catch (error) {
      next(error)    
    }
  };
  
  
