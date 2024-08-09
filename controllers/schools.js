import { School } from "../models/schools.js";
import { User } from "../models/user_model.js";
import { schools } from "../schema/schools.js";



//Get all names of Schools
export const getSchoolNames = async (req, res, next) => {
  try {
    //we are fetching location that belong to a particular user
    const userSessionId = req.session?.user?.id || req?.user?.id;

    //Get all contacts from database
    const allSchoolNames = await School.find({ user: userSessionId })
   
    res.status(200).json(allSchoolNames)
  } catch (error) {
    next(error);
  }
};




//Get one location
export const getSchoolName = async (req, res, next) => {
  try {
    //Get one location by id
    const getOneSchoolName= await School.findById(req.params.id)
    //Return a response
    res.status(200).json(getOneSchoolName)
  } catch (error) {
    next(error);
  }
}





//Post a School 
export const postSchoolName = async (req, res, next) => {
  try {
    const { error, value } = schools.validate({...req.body})

    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const createSchoolName = await School.create({ ...value, user: userSessionId });

    // user.school.push(createSchoolName.id)

    await user.save();

    res.status(201).json({message:"School has been added", createSchoolName});
  } catch (error) {
    next(error)
  }
};



//Update School
export const patchSchoolName= async (req, res, next) => {
  try {
    //update by id
    const updateSchoolName = await School.findByIdAndUpdate(req.params.id, req.body, { new: true });

    //return response
    res.status(200).json({message:"School name has been updated", updateSchoolName});
  } catch (error) {
    next(error);
  }
};





//Delete a school name
export const deleteSchoolName = async (req, res, next) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found")
    }
    //Delete a school by id
    const deleteOneName = await School.findByIdAndDelete(req.params.id)

    //return response
    if (!deleteOneName) {
      res.status(200).send("School not found")
    }

    user.school.pull(req.params.id);
    await user.save();
    res.status(200).json("School name was deleted");

  } catch (error) {
    return res.status(500).json({ error })
  }
};



