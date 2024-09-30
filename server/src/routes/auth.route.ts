import { Router } from "express";
import { activateUserController, forgotPasswordController, getUserIdController, newPasswordController, sigInController, signUpController } from "../controllers/auth.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.post('/sign-up',signUpController);
authRouter.post('/activate-user',activateUserController);
authRouter.post('/sign-in',sigInController);
authRouter.get('/me',isAuthenticated,getUserIdController);
authRouter.post('/forgot-password',forgotPasswordController);
authRouter.post('/verify-new-password',newPasswordController);

export default authRouter;