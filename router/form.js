import { Router } from "express";
import { checkUserSession } from "../middlewares/auth.js";
import { deleteForm, getForm, getForms, patchForms, postForms } from "../controllers/form.js";



export const formRouter =Router();

formRouter.get('/users/forms',getForms);

formRouter.get('/users/forms/:id', getForm);

formRouter.post('/users/forms',checkUserSession, postForms);

formRouter.patch('/users/forms/:id',checkUserSession, patchForms);

formRouter.delete('/users/forms/:id',checkUserSession, deleteForm);

