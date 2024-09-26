import { Router } from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.middleware";
import { deleteCourse, editCourse, getAllCourse, getSingleCourse, uploadCourse } from "../controllers/course.controller";

const courseRouter = Router();

courseRouter.post('/create-course',isAuthenticated,authorizeRoles('admin'),uploadCourse);
courseRouter.put('/update-course/:id',isAuthenticated,authorizeRoles('admin'),editCourse);
courseRouter.delete('/delete-course/:id',isAuthenticated,authorizeRoles('admin'),deleteCourse);
courseRouter.get('/get-course/:id',getSingleCourse);
courseRouter.get('/get-courses',getAllCourse);

export default courseRouter;