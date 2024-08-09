import { CurriculumType } from "../models/curriculum.js";
import {curriculum} from "../schema/curriculum.js";
import {User} from "../models/user_model.js"






//Get all curriculumType
export const getCurriculumTypes= async (req, res, next) => {
  try {
    //we are fetching curriculumType that belong to a particular user
    const userSessionId = req.session?.user?.id || req?.user?.id;

    //Get all types from database
    const allCurriculumTypes = await CurriculumType.find({ user: userSessionId })
   
    res.status(200).json(allCurriculumTypes)
  } catch (error) {
    next(error);
  }
};




//Get one type
export const getCurriculumType = async (req, res, next) => {
  try {
    //Get one type by id
    const getOneType = await CurriculumType.findById(req.params.id)
    //Return a response
    res.status(200).json(getOneType)
  } catch (error) {
    next(error);
  }
}





//Post a curriculumType
export const postCurriculumType = async (req, res, next) => {
  try {
    const { error, value } = curriculum.validate({...req.body})

    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const createCurriculumType = await CurriculumType.create({ ...value, user: userSessionId });

    // user.curriculumType.push(createCurriculumType.id)

    await user.save();

    res.status(201).json({message:"Curriculum has been added", createCurriculumType});
  } catch (error) {
    next(error)
  }
};



//Update curriculumType
export const patchCurriculumType= async (req, res, next) => {
  try {
    //update by id
    const updateCurriculum = await CurriculumType.findByIdAndUpdate(req.params.id, req.body, { new: true });

    //return response
    res.status(200).json({message:"Curriculum has been updated", updateCurriculum});
  } catch (error) {
    next(error);
  }
};





//Delete a curriculumType
export const deleteCurriculum = async (req, res, next) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found")
    }
    //Delete a curriculumType by id
    const deleteOneCurriculum = await CurriculumType.findByIdAndDelete(req.params.id)

    //return response
    if (!deleteOneCurriculum) {
      res.status(200).send("Curriculum not found")
    }

    user.curriculumType.pull(req.params.id);
    await user.save();
    res.status(200).json("Curriculum Type deleted");

  } catch (error) {
    return res.status(500).json({ error })
  }
};
