import { NextFunction, Request, Response } from "express";
import { ErrorException } from "../utils/response/error/error-exception.util";
import { updatedAccessToken } from "../controllers/auth.controller";
import { redis } from "../utils/redis.util";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ErrorCode } from "../utils/response/error/error-code.util";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.headers["access-token"] as string;
    
    if (!access_token) {
      return next(
        new ErrorException("Silahkan login untuk mengakses sumber daya ini", 400)
      );
    }
    const decoded = jwt.decode(access_token) as JwtPayload
    if (!decoded) {
      return next(new ErrorException("Token akses tidak valid", 400));
    }

    if (decoded.exp && decoded.exp <= Date.now() / 1000) {
      try {
        await updatedAccessToken(req, res, next);
      } catch (error) {
        return next(error);
      }
    } else {
      const user = await redis.get(decoded._id);

      if (!user) {
        return next(
          new ErrorException("Silahkan login untuk mengakses sumber daya ini", 400)
        );
      }

      (req as any).user = JSON.parse(user);

      next();
    }
  }

  export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes((req as any).user?.role || "")) {
        return next(
          new ErrorException(
            ErrorCode.Unauthenticated,
            `Role: ${(req as any).user?.role} tidak diizinkan untuk mengakses sumber daya ini`,
          )
        );
      }
      next();
    };
  };