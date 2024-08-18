import {Router} from "express";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";
import {remoteUpload} from "../middlewares/uploads.js"
import { deletePicture, getUserPictures, patchPicture, postPicture } from "../controllers/pictures.js";


export const picturesRouter = Router();


picturesRouter.get('/users/pictures', getUserPictures);

// picturesRouter.get('/users/pictures/:id', get);

picturesRouter.post('/users/pictures', isAuthenticated, remoteUpload.array('pictures',6), postPicture);
// picturesRouter.post('/users/pictures', checkUserSession, remoteUpload.single('pictures'), postPicture);

picturesRouter.patch('/users/pictures/:id',isAuthenticated, hasPermission,  remoteUpload.array('videos',6),patchPicture);

picturesRouter.delete('/users/pictures/:id',isAuthenticated, hasPermission,  deletePicture);

