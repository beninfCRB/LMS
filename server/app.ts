import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './src/routes/auth.route'
import rateLimit from 'express-rate-limit'
import { connect } from './src/utils/mongoose.util'
import { errorHandler } from './src/utils/response/error/error-handler.util'
import courseRouter from './src/routes/course.route'
import { upload } from './src/utils/multer.util'
import listEndpoints from 'express-list-endpoints'
import userRouter from './src/routes/user.route'
require("dotenv").config()

export const app = express()

//mongoose
connect();

//body parser
app.use(express.json({ limit: "50mb" }))

//cookie parser
app.use(cookieParser())

//cors origin resource sharing
app.use(cors())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use(
    express.urlencoded({
      extended: true,
    })
  );

app.use(express.json());
app.use(upload.single('file'));

app.use('/api/v1',
  authRouter,
  courseRouter,
  userRouter
)

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json("API is working")
})

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any
    err.statusCode = 404
    next(err)
})

console.log(listEndpoints(app));

app.use(limiter)
app.use(errorHandler)
