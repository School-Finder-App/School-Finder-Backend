import { Router } from "express";
import { deleteCurriculum, getCurriculumType, getCurriculumTypes, patchCurriculumType, postCurriculumType } from "../controllers/curriculum.js";
import { checkUserSession } from "../middlewares/auth.js";




export const curriculumRouter = Router();



curriculumRouter.get('/users/curriculum', getCurriculumTypes);

curriculumRouter.get('/users/curriculum/:id', getCurriculumType);

curriculumRouter.post('/users/curriculum',checkUserSession, postCurriculumType);

curriculumRouter.patch('/users/curriculum/:id', checkUserSession, patchCurriculumType);

curriculumRouter.delete('/users/curriculum/:id',checkUserSession, deleteCurriculum);