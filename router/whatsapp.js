import {Router} from "express";
import { deleteWhatsAppLink, getWhatsAppLink, getwhatsAppLinks, patchWhatsAppLink, postWhatsAppLink } from "../controllers/whatsapp.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";



export const whatsAppRouter = Router();


whatsAppRouter.get('/users/whatsAppLink', getwhatsAppLinks);

whatsAppRouter.get('/users/whatsAppLink/:id', getWhatsAppLink);

whatsAppRouter.post('/users/whatsAppLink',isAuthenticated, postWhatsAppLink);

whatsAppRouter.patch('/users/whatsAppLink/:id', isAuthenticated, hasPermission,  patchWhatsAppLink);

whatsAppRouter.delete('/users/whatsAppLink/:id',isAuthenticated, hasPermission,  deleteWhatsAppLink);