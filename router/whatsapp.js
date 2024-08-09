import {Router} from "express";
import { deleteWhatsAppLink, getWhatsAppLink, getwhatsAppLinks, patchWhatsAppLink, postWhatsAppLink } from "../controllers/whatsapp.js";
import { checkUserSession } from "../middlewares/auth.js";



export const whatsAppRouter = Router();


whatsAppRouter.get('/users/whatsAppLink', getwhatsAppLinks);

whatsAppRouter.get('/users/whatsAppLink/:id', getWhatsAppLink);

whatsAppRouter.post('/users/whatsAppLink',checkUserSession, postWhatsAppLink);

whatsAppRouter.patch('/users/whatsAppLink/:id', checkUserSession, patchWhatsAppLink);

whatsAppRouter.delete('/users/whatsAppLink/:id',checkUserSession, deleteWhatsAppLink);