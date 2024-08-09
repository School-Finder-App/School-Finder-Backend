import { Location } from "../models/location.js";
import { User } from "../models/user_model.js";
import {location} from "../schema/location.js"





//Get all locations
export const getLocations = async (req, res, next) => {
  try {
    //we are fetching location that belong to a particular user
    const userSessionId = req.session?.user?.id || req?.user?.id;

    //Get all contacts from database
    const allLocations = await Location.find({ user: userSessionId })
   
    res.status(200).json(allLocations)
  } catch (error) {
    next(error);
  }
};




//Get one location
export const getLocation = async (req, res, next) => {
  try {
    //Get one location by id
    const getOneLocation = await Location.findById(req.params.id)
    //Return a response
    res.status(200).json(getOneLocation)
  } catch (error) {
    next(error);
  }
}





//Post a location
export const postLocation = async (req, res, next) => {
  try {
    const { error, value } = location.validate({...req.body})

    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const createLocation = await Location.create({ ...value, user: userSessionId });

    // user.location.push(createLocation.id)

    await user.save();

    res.status(201).json({message:"Location has been added", createLocation});
  } catch (error) {
    next(error)
  }
};



//Update location
export const patchLocation= async (req, res, next) => {
  try {
    //update by id
    const updateLocation = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });

    //return response
    res.status(200).json({message:"Location has been updated", updateLocation});
  } catch (error) {
    next(error);
  }
};





//Delete a location
export const deleteLocation = async (req, res, next) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found")
    }
    //Delete a location by id
    const deleteOneLocation = await Location.findByIdAndDelete(req.params.id)

    //return response
    if (!deleteOneLocation) {
      res.status(200).send("Status not found")
    }

    user.location.pull(req.params.id);
    await user.save();
    res.status(200).json("Location deleted");

  } catch (error) {
    return res.status(500).json({ error })
  }
};



