import { Router } from "express";
import { deleteForm, getForm, getForms, patchForms, postForms } from "../controllers/form.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";



export const formRouter =Router();

formRouter.get('/users/forms',getForms);

formRouter.get('/users/forms/:id', getForm);

formRouter.post('/users/forms',isAuthenticated, postForms);

formRouter.patch('/users/forms/:id',isAuthenticated, hasPermission,  patchForms);

formRouter.delete('/users/forms/:id',isAuthenticated, hasPermission,  deleteForm);

