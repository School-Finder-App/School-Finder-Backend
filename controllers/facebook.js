import { FacebookLink } from "../models/facebook.js";
import { User } from "../models/user_model.js";
import {facebook} from "../schema/facebook.js"





//Get all facebookLinks
export const getFacebookLinks = async (req, res, next) => {
  try {
    //we are fetching links that belong to a particular user
    const userSessionId = req.session?.user?.id || req?.user?.id;

    //Get all links from database
    const allFacebookLinks = await FacebookLink.find({ user: userSessionId })
   
    res.status(200).json(allFacebookLinks)
  } catch (error) {
    next(error);
  }
};




//Get one facebookLink
export const getFacebookLink = async (req, res, next) => {
  try {
    //Get one status by id
    const oneFacebookLink = await FacebookLink.findById(req.params.id)
    //Return a response
    res.status(200).json(oneFacebookLink)
  } catch (error) {
    next(error);
  }
}





//Post a FacebookLink
export const postFacebookLink = async (req, res, next) => {
  try {
    const { error, value } = facebook.validate({...req.body})

    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const createFacebookLink = await FacebookLink.create({ ...value, user: userSessionId });

    // user.facebooklink.push(createFacebookLink.id)

    await user.save();

    res.status(201).json({message:"Facebook Link has been added", createFacebookLink});
  } catch (error) {
    next(error)
  }
};








//Update facebook Link
export const patchFacebookLink= async (req, res, next) => {
  try {
    //update by id
    const updateFacebookLink = await FacebookLink.findByIdAndUpdate(req.params.id, req.body, { new: true });

    //return response
    res.status(200).json({message:"Status has been updated", updateFacebookLink});
  } catch (error) {
    next(error);
  }
};





//Delete a link
export const deleteFacebookLink = async (req, res, next) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found")
    }
    //Delete a link by id
    const deleteOneLink = await FacebookLink.findByIdAndDelete(req.params.id)

    //return response
    if (!deleteOneLink) {
      res.status(200).send("Facebook Link not found")
    }

    user.facebookLink.pull(req.params.id);
    await user.save();
    res.status(200).json("Facebook Link deleted");

  } catch (error) {
    return res.status(500).json({ error })
  }
};



