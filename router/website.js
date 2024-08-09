import {Router} from "express";
import { deleteWebsiteLink, getWebsiteLink, getWebsiteLinks, patchWebsiteLink, postWebsiteLink } from "../controllers/website.js";
import { checkUserSession } from "../middlewares/auth.js";



export const websiteRouter = Router();


websiteRouter.get('/users/websiteLink', getWebsiteLinks);

websiteRouter.get('/users/websiteLink/:id', getWebsiteLink);

websiteRouter.post('/users/websiteLink',checkUserSession, postWebsiteLink);

websiteRouter.patch('/users/websiteLink/:id', checkUserSession, patchWebsiteLink);

websiteRouter.delete('/users/websiteLink/:id',checkUserSession, deleteWebsiteLink);