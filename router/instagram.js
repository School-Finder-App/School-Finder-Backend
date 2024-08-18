import { Router } from "express";
import { deleteInstagramLink, getInsatagramLink, getInstagramLinks, patchInstagramLink, postInstagramLink } from "../controllers/instagram.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";


export const instagramRouter = Router();



instagramRouter.get('/users/instagramLink', getInstagramLinks);

instagramRouter.get('/users/instagramLink/:id', getInsatagramLink);

instagramRouter.post('/users/instagramLink', isAuthenticated, postInstagramLink);

instagramRouter.patch('/users/instagramLink/:id', isAuthenticated, hasPermission, patchInstagramLink);

instagramRouter.delete('/users/instagramLink/:id',isAuthenticated, hasPermission,  deleteInstagramLink);