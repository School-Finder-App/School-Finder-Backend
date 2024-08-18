import { forgotPassword, getUnregisteredUser, getUser, getUsers, login, logout, resetPassword, signup, token, updateUser, verifyResetToken } from "../controllers/user_controller.js";
import { Router } from "express";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";


export const userRouter = Router();

userRouter.get("/users",isAuthenticated, hasPermission('read_users'), getUsers);

userRouter.post("/users/auth/session/login", login);

userRouter.post("/users/auth/token/login", token);

userRouter.post("/users/auth/logout", isAuthenticated, logout);

userRouter.post("/users/forgot-password", forgotPassword);

userRouter.get('/users/reset-token/:id', verifyResetToken);

userRouter.post('/users/reset-password', resetPassword);

userRouter.post("/users/auth/signup", signup);

userRouter.patch("/users/auth/updateUser", isAuthenticated, hasPermission('update_user'), updateUser);
 
userRouter.get("/users/auth/:userName", getUser);

userRouter.get("/users/unregistered-user", getUnregisteredUser);

// userRouter.post('/users', isAuthenticated, hasPermission('create_user'), createUser);

// userRouter.delete('/users/:id', isAuthenticated, hasPermission('delete_user'), deleteUser);



// Export Router to index.js
export default userRouter;