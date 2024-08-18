import { Router } from "express";
import { deleteFacebookLink, getFacebookLink, getFacebookLinks, patchFacebookLink, postFacebookLink } from "../controllers/facebook.js";
import {hasPermission, isAuthenticated } from "../middlewares/auth.js";


export const facebookRouter = Router();



facebookRouter.get('/users/facebookLink', getFacebookLinks);

facebookRouter.get('/users/facebookLink/:id', getFacebookLink);

facebookRouter.post('/users/facebookLink',isAuthenticated, postFacebookLink);

facebookRouter.patch('/users/facebookLink/:id',isAuthenticated, hasPermission, patchFacebookLink);

facebookRouter.delete('/users/facebookLink/:id',isAuthenticated, hasPermission,deleteFacebookLink);