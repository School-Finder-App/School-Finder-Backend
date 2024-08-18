import {Router} from "express";
import { deleteWebsiteLink, getWebsiteLink, getWebsiteLinks, patchWebsiteLink, postWebsiteLink } from "../controllers/website.js";
import {hasPermission, isAuthenticated } from "../middlewares/auth.js";



export const websiteRouter = Router();


websiteRouter.get('/users/websiteLink', getWebsiteLinks);

websiteRouter.get('/users/websiteLink/:id', getWebsiteLink);

websiteRouter.post('/users/websiteLink',isAuthenticated, postWebsiteLink);

websiteRouter.patch('/users/websiteLink/:id', isAuthenticated, hasPermission,  patchWebsiteLink);

websiteRouter.delete('/users/websiteLink/:id',isAuthenticated, hasPermission,  deleteWebsiteLink);