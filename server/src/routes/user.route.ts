import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import { googleAuth, updateProfileAvatarController, updateUserInfoController, updateUserPasswordController } from "../controllers/user.controller";

const userRouter = Router();

userRouter.put("/update-user-avatar", isAuthenticated, updateProfileAvatarController);
userRouter.post("/social-auth", googleAuth);
userRouter.put("/update-user-info", isAuthenticated, updateUserInfoController);
userRouter.put("/update-user-password", isAuthenticated, updateUserPasswordController);

export default userRouter;