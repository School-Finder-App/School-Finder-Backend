import {Router} from "express";
import { deleteSchoolName, getSchoolName, getSchoolNames, patchSchoolName, postSchoolName } from "../controllers/schools.js";
import { checkUserSession } from "../middlewares/auth.js";


export const schoolRouter = Router();



schoolRouter.get('/users/schools', getSchoolNames);

schoolRouter.get('/users/schools/:id', getSchoolName);

schoolRouter.post('/users/schools',checkUserSession, postSchoolName);

schoolRouter.patch('/users/schools/:id', checkUserSession, patchSchoolName);

schoolRouter.delete('/users/schools/:id',checkUserSession, deleteSchoolName);