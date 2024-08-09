import {Router} from "express";
import { checkUserSession } from "../middlewares/auth.js";
import {remoteUpload} from "../middlewares/uploads.js"
import { deleteVideo, getUserVideo, patchVideo, postVideo } from "../controllers/videos.js";



export const videoRouter = Router();


videoRouter.get('/users/videos', getUserVideo);

// videoRouter.get('/users/videos/:id', get);

videoRouter.post('/users/videos', checkUserSession, remoteUpload.single('videos'), postVideo);

videoRouter.patch('/users/videos/:id',checkUserSession, remoteUpload.single('videos'), patchVideo);

videoRouter.delete('/users/videos/:id',checkUserSession, deleteVideo);

