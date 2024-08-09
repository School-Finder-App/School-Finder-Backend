import {WebsiteLink} from "../models/website.js"
import { User } from "../models/user_model.js";
import {website} from "../schema/website.js"






//Get all websiteLinks
export const getWebsiteLinks = async (req, res, next) => {
  try {
    //we are fetching links that belong to a particular user
    const userSessionId = req.session?.user?.id || req?.user?.id;

    //Get all links from database
    const allWebsiteLinks = await WebsiteLink.find({ user: userSessionId })
   
    res.status(200).json(allWebsiteLinks)
  } catch (error) {
    next(error);
  }
};




//Get one websiteLink
export const getWebsiteLink = async (req, res, next) => {
  try {
    //Get one website by id
    const oneWebsiteLink = await WebsiteLink.findById(req.params.id)
    //Return a response
    res.status(200).json(oneWebsiteLink)
  } catch (error) {
    next(error);
  }
}





//Post a websiteLink
export const postWebsiteLink = async (req, res, next) => {
  try {
    const { error, value } = website.validate({...req.body})

    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const createWebsiteLink = await WebsiteLink.create({ ...value, user: userSessionId });

    // user.websiteLink.push(createWebsiteLink.id)

    await user.save();

    res.status(201).json({message:"Website Link has been added", createWebsiteLink});
  } catch (error) {
    next(error)
  }
};








//Update website Link
export const patchWebsiteLink= async (req, res, next) => {
  try {
    //update by id
    const updateWebsiteLink = await WebsiteLink.findByIdAndUpdate(req.params.id, req.body, { new: true });

    //return response
    res.status(200).json({message:"Link has been updated", updateWebsiteLink});
  } catch (error) {
    next(error);
  }
};





//Delete a link
export const deleteWebsiteLink = async (req, res, next) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found")
    }
    //Delete a link by id
    const deleteOneLink = await WebsiteLink.findByIdAndDelete(req.params.id)

    //return response
    if (!deleteOneLink) {
      res.status(200).send("Website Link not found")
    }

    user.websiteLink.pull(req.params.id);
    await user.save();
    res.status(200).json("Website Link deleted");

  } catch (error) {
    return res.status(500).json({ error })
  }
};



