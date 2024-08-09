import {WhatsAppLink} from "../models/whatsapp.js"
import { User } from "../models/user_model.js";
import {whatsApp} from "../schema/whatsapp.js"





//Get all whatsAppLinks
export const getwhatsAppLinks = async (req, res, next) => {
  try {
    //we are fetching links that belong to a particular user
    const userSessionId = req.session?.user?.id || req?.user?.id;

    //Get all links from database
    const allWhatsAppLinks = await WhatsAppLink.find({ user: userSessionId })
   
    res.status(200).json(allWhatsAppLinks)
  } catch (error) {
    next(error);
  }
};




//Get one whatsAppLink
export const getWhatsAppLink = async (req, res, next) => {
  try {
    //Get one status by id
    const oneWhatsAppLink = await WhatsAppLink.findById(req.params.id)
    //Return a response
    res.status(200).json(oneWhatsAppLink)
  } catch (error) {
    next(error);
  }
}





//Post a whatsAppLink
export const postWhatsAppLink = async (req, res, next) => {
  try {
    const { error, value } = whatsApp.validate({...req.body})

    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const createWhatsAppLink = await WhatsAppLink.create({ ...value, user: userSessionId });

    // user.whatsAppLink.push(createWhatsAppLink.id)

    await user.save();

    res.status(201).json({message:"Link has been added", createWhatsAppLink});
  } catch (error) {
    next(error)
  }
};








//Update whatsApp Link
export const patchWhatsAppLink= async (req, res, next) => {
  try {
    //update by id
    const updateWhatsAppLink = await WhatsAppLink.findByIdAndUpdate(req.params.id, req.body, { new: true });

    //return response
    res.status(200).json({message:"Link has been updated", updateWhatsAppLink});
  } catch (error) {
    next(error);
  }
};





//Delete a link
export const deleteWhatsAppLink = async (req, res, next) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found")
    }
    //Delete a link by id
    const deleteOneLink = await WhatsAppLink.findByIdAndDelete(req.params.id)

    //return response
    if (!deleteOneLink) {
      res.status(200).send("Link not found")
    }

    user.whatsAppLink.pull(req.params.id);
    await user.save();
    res.status(200).json("Link deleted");

  } catch (error) {
    return res.status(500).json({ error })
  }
};



