import { Router } from "express";
import { deleteInstagramLink, getInsatagramLink, getInstagramLinks, patchInstagramLink, postInstagramLink } from "../controllers/instagram.js";
import { checkUserSession } from "../middlewares/auth.js";


export const instagramRouter = Router();



instagramRouter.get('/users/instagramLink', getInstagramLinks);

instagramRouter.get('/users/instagramLink/:id', getInsatagramLink);

instagramRouter.post('/users/instagramLink', checkUserSession, postInstagramLink);

instagramRouter.patch('/users/instagramLink/:id', checkUserSession, patchInstagramLink);

instagramRouter.delete('/users/instagramLink/:id',checkUserSession, deleteInstagramLink);