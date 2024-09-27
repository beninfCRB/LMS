import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import { updateProfileAvatar } from "../controllers/user.controller";

const userRouter = Router();

userRouter.put("/update-user-avatar", isAuthenticated, updateProfileAvatar);

export default userRouter;