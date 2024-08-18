import {Router} from "express";
import { deleteVacancy, getVacancies, getVacancy, patchVacancy, postVacancy } from "../controllers/vacancy.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";



export const vacancyRouter = Router();



vacancyRouter.get('/users/vacancy', getVacancies);

vacancyRouter.get('/users/vacancy/:id', getVacancy);

vacancyRouter.post('/users/vacancy',isAuthenticated, postVacancy);

vacancyRouter.patch('/users/vacancy/:id', isAuthenticated, hasPermission,  patchVacancy);

vacancyRouter.delete('/users/vacancy/:id',isAuthenticated, hasPermission,  deleteVacancy);