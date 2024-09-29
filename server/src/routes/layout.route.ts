import { Router } from "express";
import { addLayout, editLayout, getLayoutByType } from "../controllers/layout.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.middleware";

const layoutRouter = Router()

layoutRouter.post("/create-layout", isAuthenticated, authorizeRoles('admin'), addLayout);
layoutRouter.put("/edit-layout", isAuthenticated, authorizeRoles('admin'), editLayout);
layoutRouter.get("/get-layout/:type", getLayoutByType);

export default layoutRouter;