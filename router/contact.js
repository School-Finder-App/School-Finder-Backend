import { Router } from "express";
import { deleteContact, getContact, getContacts, patchContact, postContact } from "../controllers/contact.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";
// import { checkUserSession } from "../middlewares/auth.js";


export const contactRouter = Router();



contactRouter.get('/users/contacts', getContacts);

contactRouter.get('/users/contacts/:id', getContact);

contactRouter.post('/users/contacts',isAuthenticated, postContact);

contactRouter.patch('/users/contacts/:id',isAuthenticated, hasPermission, patchContact);

contactRouter.delete('/users/contacts/:id',isAuthenticated, hasPermission,deleteContact);