
import { InstagramLink } from "../models/instagram.js";
import { User } from "../models/user_model.js";
import { instagram } from "../schema/instagram.js";





//Get all instagramLinks
export const getInstagramLinks = async (req, res, next) => {
  try {
    //we are fetching links that belong to a particular user
    const userSessionId = req.session?.user?.id || req?.user?.id;

    //Get all links from database
    const allInstagramLinks = await FacebookLink.find({ user: userSessionId })
   
    res.status(200).json(allInstagramLinks)
  } catch (error) {
    next(error);
  }
};




//Get one instagramLink
export const getInsatagramLink = async (req, res, next) => {
  try {
    //Get one status by id
    const oneInstagramLink = await FacebookLink.findById(req.params.id)
    //Return a response
    res.status(200).json(oneInstagramLink)
  } catch (error) {
    next(error);
  }
}





//Post a InstagramLink
export const postInstagramLink = async (req, res, next) => {
  try {
    const { error, value } = instagram.validate({...req.body})

    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const createInstagramLink = await InstagramLink.create({ ...value, user: userSessionId });

    // user.instagramlink.push(createInstagramLink.id)

    await user.save();

    res.status(201).json({message:"Instagram Link has been added", createInstagramLink});
  } catch (error) {
    next(error)
  }
};








//Update Instagram Link
export const patchInstagramLink= async (req, res, next) => {
  try {
    //update by id
    const updateInstagramLink = await InstagramLink.findByIdAndUpdate(req.params.id, req.body, { new: true });

    //return response
    res.status(200).json({message:"Instagram Link has been updated", updateInstagramLink});
  } catch (error) {
    next(error);
  }
};





//Delete a link
export const deleteInstagramLink = async (req, res, next) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found")
    }
    //Delete a link by id
    const deleteOneLink = await InstagramLink.findByIdAndDelete(req.params.id)

    //return response
    if (!deleteOneLink) {
      res.status(200).send(" Link not found")
    }

    user.instagramLink.pull(req.params.id);
    await user.save();
    res.status(200).json("Link deleted");

  } catch (error) {
    return res.status(500).json({ error })
  }
};



