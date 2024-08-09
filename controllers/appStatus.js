import { ApplicationStatus } from "../models/appStatus.js";
import { User } from "../models/user_model.js";
import { appStatus } from "../schema/appStatus.js";



//Get all appStatus
export const getAppStatuses = async (req, res, next) => {
  try {
    //we are fetching statuses that belong to a particular user
    const userSessionId = req.session?.user?.id || req?.user?.id;

    //Get all statuses from database
    const allAppStatus = await ApplicationStatus.find({ user: userSessionId });
    
   
    res.status(200).json(allAppStatus)
  } catch (error) {
    next(error);
  }
};




//Get one appstatus
export const getAppStatus = async (req, res, next) => {
  try {
    //Get one status by id
    const getOneStatus = await ApplicationStatus.findById(req.params.id)
    //Return a response
    res.status(200).json(getOneStatus)
  } catch (error) {
    next(error);
  }
}





//Post an AppStatus
export const postAppStatus = async (req, res, next) => {
  try {
    const { error, value } = appStatus.validate({...req.body})

    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const appstatus = await ApplicationStatus.create({ ...value, user: userSessionId });

    // user.applicationStatus.push(appstatus.id)

    await user.save();

    res.status(201).json({message:"Status has been added", appstatus});
  } catch (error) {
    next(error)
  }
};








//Update statua
export const patchAppStatus= async (req, res, next) => {
  try {
    //update by id
    const updateAppStatus = await ApplicationStatus.findByIdAndUpdate(req.params.id, req.body, { new: true });

    //return response
    res.status(200).json({message:"Status has been updated", updateAppStatus});
  } catch (error) {
    next(error);
  }
};





//Delete a status
export const deleteAppStatus = async (req, res, next) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found")
    }
    //Delete a status by id
    const deleteOneStatus = await ApplicationStatus.findByIdAndDelete(req.params.id)

    //return response
    if (!deleteOneStatus) {
      res.status(200).send("Status not found")
    }

    user.applicationStatus.pull(req.params.id);
    await user.save();
    res.status(200).json("Status deleted");

  } catch (error) {
    return res.status(500).json({ error })
  }
};



