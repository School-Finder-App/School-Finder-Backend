import {Router} from "express";
import { deleteLocation, getLocation, postLocation, getLocations,patchLocation } from "../controllers/location.js";
import { checkUserSession } from "../middlewares/auth.js";



export const locationRouter = Router();



locationRouter.get('/users/location', getLocations);

locationRouter.get('/users/location/:id', getLocation);

locationRouter.post('/users/location', checkUserSession, postLocation);

locationRouter.patch('/users/location/:id', checkUserSession, patchLocation);

locationRouter.delete('/users/location/:id',checkUserSession, deleteLocation);