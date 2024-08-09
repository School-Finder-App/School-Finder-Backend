import { Contact } from "../models/contact.js";
import { User } from "../models/user_model.js";
import { contact } from "../schema/contact.js";



//Get all contacts
export const getContacts = async (req, res, next) => {
  try {
    //we are fetching contact that belong to a particular user
    const userSessionId = req.session?.user?.id || req?.user?.id;

    //Get all contacts from database
    const allContact = await Contact.find({ user: userSessionId })
   
    res.status(200).json(allContact)
  } catch (error) {
    next(error);
  }
};




//Get one contact
export const getContact = async (req, res, next) => {
  try {
    //Get one contact by id
    const getOneContact = await Contact.findById(req.params.id)
    //Return a response
    res.status(200).json(getOneContact)
  } catch (error) {
    next(error);
  }
}



//Post a contact
export const postContact = async (req, res, next) => {
  try {
    const { error, value } = contact.validate({...req.body})

    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const createContact = await Contact.create({ ...value, user: userSessionId });

    // user.contact.push(createContact.id)

    await user.save();

    res.status(201).json({message:"Contact has been added", createContact});
  } catch (error) {
    next(error)
  }
};



//Update contact 
export const patchContact= async (req, res, next) => {
  try {
    //update by id
    const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

    //return response
    res.status(200).json({message:"Contact has been updated", updateContact});
  } catch (error) {
    next(error);
  }
};



//Delete a contact
export const deleteContact = async (req, res, next) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found")
    }
    //Delete a status by id
    const deleteOneContact = await Contact.findByIdAndDelete(req.params.id)

    //return response
    if (!deleteOneContact) {
      res.status(200).send("Status not found")
    }

    user.contact.pull(req.params.id);
    await user.save();
    res.status(200).json("Contact deleted");

  } catch (error) {
    return res.status(500).json({ error })
  }
};



