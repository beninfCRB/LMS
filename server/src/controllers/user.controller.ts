import cloudinary from "cloudinary";
import { IUpdateProfilePicture } from "../types/global";
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { redis } from "../utils/redis.util";
import { ErrorException } from "../utils/response/error/error-exception.util";
import { comparePassword } from "../utils/password.util";
import { ResponseData } from "../utils/response/success/success-response.util";
import { SuccessCode } from "../utils/response/success/success-code.util";
import { generateAccessToken, generateRefreshToken } from "../utils/token.util";
import { accessTokenOptions, refreshTokenOptions } from "../utils/cookie.util";

export const updateProfileAvatarController = async (req: Request, res: Response, next: NextFunction) => {
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

      res.send(new ResponseData(SuccessCode.Sucessed,user))
    } catch (error: any) {
      console.log(error);
      return next(new ErrorException(error.message));
    }
  }

export const updateUserInfoController = async (req:Request, res:Response, next:NextFunction) => {
  try {
      const { name } = req.body;
      const userId = (req as any).user?._id;
      const user = await UserModel.findById(userId);
      if (name && user) {
          user.name = name;
      }
      await user?.save();
      await redis.set(userId, JSON.stringify(user));
      res.send(new ResponseData(SuccessCode.Sucessed,user))
  }
  catch (error:any) {
      return next(new ErrorException(error.message));
  }
}

export const updateUserPasswordController = async (req:Request, res:Response, next:NextFunction) => {
  try {
      const { oldPassword, newPassword } = req.body;
      if (!oldPassword || !newPassword) {
          return next(new ErrorException("Silahkan masukkan password lama dan baru"));
      }
      const user = await UserModel.findById((req as any).user?._id).select("+password");
      if (user?.password === undefined) {
          return next(new ErrorException("Pengguna tidak valid"));
      }

      const isPasswordMatch = comparePassword(oldPassword,user.password);
      if (!isPasswordMatch) {
          return next(new ErrorException("Password lama tidak valid", 400));
      }
      user.password = newPassword;
      await user.save();
      await redis.set((req as any).user?._id, JSON.stringify(user));
      res.send(new ResponseData(SuccessCode.Sucessed,user))
  }
  catch (error:any) {
      return next(new ErrorException(error.message));
  }
}

export const googleAuth = async (req:Request, res:Response, next:NextFunction) => {
  try {
      const { email, name, avatar } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
          const newUser = await UserModel.create({ email, name, avatar });
          const accessToken = generateAccessToken(newUser);
          const refreshToken = generateRefreshToken(newUser);
          res.cookie("access_token", accessToken, { ...accessTokenOptions, sameSite: 'none' });
          res.cookie("refresh_token", refreshToken, { ...refreshTokenOptions, sameSite: 'none' });
          redis.set(newUser._id, JSON.stringify(newUser) as any);
          res.send(new ResponseData(SuccessCode.Created,user));
      }
      else {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.cookie("access_token", accessToken, { ...accessTokenOptions, sameSite: 'none' });
        res.cookie("refresh_token", refreshToken, { ...refreshTokenOptions, sameSite: 'none' });
        redis.set(user._id, JSON.stringify(user) as any);
        res.send(new ResponseData(SuccessCode.Created,user));
      }
  }
  catch (error:any) {
      return next(new ErrorException(error.message));
  }
}