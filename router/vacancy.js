import {Router} from "express";
import { deleteVacancy, getVacancies, getVacancy, patchVacancy, postVacancy } from "../controllers/vacancy.js";
import { checkUserSession } from "../middlewares/auth.js";



export const vacancyRouter = Router();



vacancyRouter.get('/users/vacancy', getVacancies);

vacancyRouter.get('/users/vacancy/:id', getVacancy);

vacancyRouter.post('/users/vacancy',checkUserSession, postVacancy);

vacancyRouter.patch('/users/vacancy/:id', checkUserSession, patchVacancy);

vacancyRouter.delete('/users/vacancy/:id',checkUserSession, deleteVacancy);