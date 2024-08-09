import { getUser, getUsers, login, logout, signup, token, updateUser } from "../controllers/user_controller.js";
import { Router } from "express";
import { checkUserSession } from "../middlewares/auth.js";


export const userRouter = Router();

userRouter.get("/users", getUsers);

userRouter.post("/users/auth/session/login", login);

userRouter.post("/users/auth/token/login", token);

userRouter.post("/users/auth/logout", logout);

userRouter.post("/users/auth/signup", signup);

userRouter.post("/users/auth/updateUser", updateUser);

    
userRouter.get("/users/auth/:userName", checkUserSession, getUser);

// Export Router to index.js
export default userRouter;