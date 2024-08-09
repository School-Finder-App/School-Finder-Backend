import { Router } from "express";
import { deleteContact, getContact, getContacts, patchContact, postContact } from "../controllers/contact.js";
import { checkUserSession } from "../middlewares/auth.js";


export const contactRouter = Router();



contactRouter.get('/users/contacts', getContacts);

contactRouter.get('/users/contacts/:id', getContact);

contactRouter.post('/users/contacts', checkUserSession, postContact);

contactRouter.patch('/users/contacts/:id', checkUserSession, patchContact);

contactRouter.delete('/users/contacts/:id',checkUserSession, deleteContact);