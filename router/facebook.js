import { Router } from "express";
import { deleteFacebookLink, getFacebookLink, getFacebookLinks, patchFacebookLink, postFacebookLink } from "../controllers/facebook.js";
import { checkUserSession } from "../middlewares/auth.js";


export const facebookRouter = Router();



facebookRouter.get('/users/facebookLink', getFacebookLinks);

facebookRouter.get('/users/facebookLink/:id', getFacebookLink);

facebookRouter.post('/users/facebookLink',checkUserSession, postFacebookLink);

facebookRouter.patch('/users/facebookLink/:id', checkUserSession, patchFacebookLink);

facebookRouter.delete('/users/facebookLink/:id',checkUserSession, deleteFacebookLink);