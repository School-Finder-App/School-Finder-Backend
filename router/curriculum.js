import { Router } from "express";
import { deleteCurriculum, getCurriculumType, getCurriculumTypes, patchCurriculumType, postCurriculumType } from "../controllers/curriculum.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";




export const curriculumRouter = Router();



curriculumRouter.get('/users/curriculum', getCurriculumTypes);

curriculumRouter.get('/users/curriculum/:id', getCurriculumType);

curriculumRouter.post('/users/curriculum',isAuthenticated, postCurriculumType);

curriculumRouter.patch('/users/curriculum/:id', isAuthenticated, hasPermission, patchCurriculumType);

curriculumRouter.delete('/users/curriculum/:id',isAuthenticated, hasPermission,deleteCurriculum);