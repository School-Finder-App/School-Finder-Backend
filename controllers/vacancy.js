import {Vacancy} from "../models/vacancy.js"
import { User } from "../models/user_model.js";
import {vacancy} from "../schema/vacancy.js"





//Get all vacancies
export const getVacancies = async (req, res, next) => {
  try {
    //we are fetching vacancies that belong to a particular user
    const userSessionId = req.session?.user?.id || req?.user?.id;

    //Get all vacancies from database
    const allVacancies = await Vacancy.find({ user: userSessionId })
   
    res.status(200).json(allVacancies)
  } catch (error) {
    next(error);
  }
};




//Get one vacancy
export const getVacancy = async (req, res, next) => {
  try {
    //Get one vacancy by id
    const getOneVacancy = await Vacancy.findById(req.params.id)
    //Return a response
    res.status(200).json(getOneVacancy)
  } catch (error) {
    next(error);
  }
}





//Post a vacancy
export const postVacancy = async (req, res, next) => {
  try {
    const { error, value } = vacancy.validate({...req.body})

    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const createVacancy = await Vacancy.create({ ...value, user: userSessionId });

    // user.vacancy.push(createVacancy.id)

    await user.save();

    res.status(201).json({message:"Vacancy has been added", createVacancy});
  } catch (error) {
    next(error)
  }
};



//Update vacancy 
export const patchVacancy= async (req, res, next) => {
  try {
    //update by id
    const updateVacancy = await Vacancy.findByIdAndUpdate(req.params.id, req.body, { new: true });

    //return response
    res.status(200).json({message:"Vacancy has been updated", updateVacancy});
  } catch (error) {
    next(error);
  }
};





//Delete a vacancy
export const deleteVacancy = async (req, res, next) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found")
    }
    //Delete a vacancy by id
    const deleteOneVacancy = await Vacancy.findByIdAndDelete(req.params.id)

    //return response
    if (!deleteOneVacancy) {
      res.status(200).send("Vacancy not found")
    }

    user.vacancy.pull(req.params.id);
    await user.save();
    res.status(200).json("Vacancy deleted");

  } catch (error) {
    return res.status(500).json({ error })
  }
};



