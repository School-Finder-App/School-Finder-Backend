import {Router} from "express";
import { deleteSchoolName, getSchoolName, getSchoolNames, patchSchoolName, postSchoolName } from "../controllers/schools.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";


export const schoolRouter = Router();



schoolRouter.get('/users/schools', getSchoolNames);

schoolRouter.get('/users/schools/:id', getSchoolName);

schoolRouter.post('/users/schools',isAuthenticated, postSchoolName);

schoolRouter.patch('/users/schools/:id', isAuthenticated, hasPermission,  patchSchoolName);

schoolRouter.delete('/users/schools/:id',isAuthenticated, hasPermission,  deleteSchoolName);