import {Router} from "express";
import { deleteLocation, getLocation, postLocation, getLocations,patchLocation } from "../controllers/location.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";



export const locationRouter = Router();



locationRouter.get('/users/location', getLocations);

locationRouter.get('/users/location/:id', getLocation);

locationRouter.post('/users/location',isAuthenticated, postLocation);

locationRouter.patch('/users/location/:id', isAuthenticated, hasPermission,  patchLocation);

locationRouter.delete('/users/location/:id',isAuthenticated, hasPermission,  deleteLocation);