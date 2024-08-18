import { Router } from "express";
import { deleteAppStatus, getAppStatus, getAppStatuses, patchAppStatus, postAppStatus } from "../controllers/appStatus.js";
// import { checkUserSession } from "../middlewares/auth.js";
import {hasPermission, isAuthenticated} from "../middlewares/auth.js"


export const appStatusRouter = Router();



appStatusRouter.get('/users/applicationStatus', getAppStatuses);

appStatusRouter.get('/users/applicationStatus/:id', getAppStatus);

appStatusRouter.post('/users/applicationStatus',isAuthenticated,postAppStatus);

appStatusRouter.patch('/users/applicationStatus/:id', isAuthenticated, hasPermission, patchAppStatus);

appStatusRouter.delete('/users/applicationStatus/:id',isAuthenticated, hasPermission, deleteAppStatus);