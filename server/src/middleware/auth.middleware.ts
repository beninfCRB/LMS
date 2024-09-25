import { NextFunction, Request, Response } from "express";
import { ErrorException } from "../utils/response/error/error-exception.util";
import { UpdatedAccessToken } from "../controllers/auth.controller";
import { redis } from "../utils/redis.util";
import jwt, { JwtPayload } from "jsonwebtoken";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.headers["access-token"] as string;
    
    if (!access_token) {
      return next(
        new ErrorException("Please login to access this resource", 400)
      );
    }
    const decoded = jwt.decode(access_token) as JwtPayload
    if (!decoded) {
      return next(new ErrorException("access token is not valid", 400));
    }

    if (decoded.exp && decoded.exp <= Date.now() / 1000) {
      try {
        await UpdatedAccessToken(req, res, next);
      } catch (error) {
        return next(error);
      }
    } else {
      const user = await redis.get(decoded._id);

      if (!user) {
        return next(
          new ErrorException("Please login to access this resource", 400)
        );
      }

      (req as any).user = JSON.parse(user);

      next();
    }
  }