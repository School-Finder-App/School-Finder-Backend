import { Router } from "express";
import { deleteAppStatus, getAppStatus, getAppStatuses, patchAppStatus, postAppStatus } from "../controllers/appStatus.js";
import { checkUserSession } from "../middlewares/auth.js";


export const appStatusRouter = Router();



appStatusRouter.get('/users/applicationStatus', getAppStatuses);

appStatusRouter.get('/users/applicationStatus/:id', getAppStatus);

appStatusRouter.post('/users/applicationStatus',checkUserSession, postAppStatus);

appStatusRouter.patch('/users/applicationStatus/:id', checkUserSession, patchAppStatus);

appStatusRouter.delete('/users/applicationStatus/:id',checkUserSession, deleteAppStatus);