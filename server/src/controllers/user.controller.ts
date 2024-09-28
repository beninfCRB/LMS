import cloudinary from "cloudinary";
import { IUpdateProfilePicture } from "../types/global";
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { redis } from "../utils/redis.util";
import { ErrorException } from "../utils/response/error/error-exception.util";

export const updateProfileAvatar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body as IUpdateProfilePicture;

      const userId = (req as any).user?._id;

      const user = await UserModel.findById(userId).select("+password");

      if (avatar && user) {
        if (user?.avatar?.public_id) {
          await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
          });
          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
          });
          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      await user?.save();

      await redis.set(userId, JSON.stringify(user));

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorException(error.message));
    }
  }