import { Router } from "express";
import { ActivateUserController, GetUserIdController, SigInController, SignUpController } from "../controllers/auth.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.post('/sign-up',SignUpController);
authRouter.post('/activate-user',ActivateUserController);
authRouter.post('/sign-in',SigInController);
authRouter.get('/me',isAuthenticated,GetUserIdController);

export default authRouter;