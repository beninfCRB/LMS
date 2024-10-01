import ejs from "ejs";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import path from "path";
import { ulid } from "ulid";
import { UserModel } from "../models/user.model";
import { IActivationRequest, IActivationUser, IRegistrationBody } from "../types/global";
import { activateUser, createActivationToken } from "../utils/activate.util";
import { accessTokenOptions, refreshTokenOptions } from "../utils/cookie.util";
import { comparePassword, passwordHash } from "../utils/password.util";
import { redis } from "../utils/redis.util";
import { ErrorCode } from "../utils/response/error/error-code.util";
import { ErrorException } from "../utils/response/error/error-exception.util";
import { SuccessCode } from "../utils/response/success/success-code.util";
import { ResponseData } from "../utils/response/success/success-response.util";
import sendMail from "../utils/sendMail";
import { generateAccessToken, generateRefreshToken } from "../utils/token.util";

export const signUpController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password } = req.body;

    const userExists = await UserModel.findOne({ email: email });
    if (!!userExists) {
      return next(new ErrorException(ErrorCode.NotFound, { email }));
    }

    const user: IRegistrationBody = {
      name,
      email,
      password,
    };
    
    const activationToken = createActivationToken(user);

    const activationCode = activationToken.activationCode;

    const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Aktivasi Akun Anda",
          template: "activation-mail.ejs",
          data,
        });

        res.status(201).json({
          message: `Silahkan periksa email Anda: ${user.email} untuk mengaktifkan akun Anda!`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorException("400",error.message));
      }
  } catch (error:any) {
    return new ErrorException(ErrorCode.UnknownError)
  } 
}

export const activateUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { activation_token, activation_code } = req.body as IActivationRequest;

    const newUser: IActivationUser = activateUser(
      activation_token,
      process.env.ACTIVATION_SECRET as string
    );
    
    if (newUser.activationCode !== activation_code) {
       return next(new ErrorException(ErrorCode.Unauthenticated, "Kode aktivasi tidak valid"));
    }

    const { name, email, password } = newUser.user;

    const existUser = await UserModel.findOne({ email });

    if (existUser) {
      return next(new ErrorException("400","Email sudah ada"));
    }
    
    const hash = passwordHash(password);
    const createUser = {
      _id: ulid(),
      email,
      name,
      password: hash,
      role:'user',
      isVerified:true
    };
    
    const created = await UserModel.create(createUser);
    res.send(new ResponseData(SuccessCode.Created,created))
  } catch (error: any) {
    return next(new ErrorException("400",error.message));
  }
}

export const sigInController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
  
    const userExists = await UserModel.findOne({ email: email });
     
    if (!userExists) {
      return next(new ErrorException(ErrorCode.Unauthenticated));
    }
    

    const validPassword = comparePassword(password, userExists.password);
    if (!validPassword) {
       return next(new ErrorException(ErrorCode.Unauthenticated));
    }
  
    const accessToken = generateAccessToken(userExists);
    const refreshToken = generateRefreshToken(userExists);
  
    const user = {
      _id:userExists._id,
      email:userExists.email,
      password:userExists.password,
      name:userExists.name,
      role:userExists.role ?userExists.role:"user",
      accessToken,
      refreshToken
    }
   
    res.cookie("access_token", accessToken, { ...accessTokenOptions, sameSite: 'none' });
    res.cookie("refresh_token", refreshToken, { ...refreshTokenOptions, sameSite: 'none' });
    redis.set(user._id, JSON.stringify(user) as any);

    res.send(new ResponseData(SuccessCode.Created,user));
  } catch (error:any) {
    return new ErrorException(ErrorCode.UnknownError)
  }
}

export const updatedAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refresh_token = req.headers["refresh-token"] as string;
    const decoded = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN as string
    ) as JwtPayload;

    const message = "Tidak dapat memperbarui token";
    if (!decoded) {
      return next(new ErrorException("400",message));
    }

    const session = await redis.get(decoded.id as string);

    if (!session) {
      return next(
        new ErrorException("400","Silahkan login untuk mengakses sumber daya ini!")
      );
    }

    const user = JSON.parse(session);

    (req as any).user = user;

    await redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days

    return next();
  } catch (error: any) {
    return next(new ErrorException("400",error.message));
  }
}

export const getUserIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user._id;

    const userJson = await redis.get(userId);

  if (userJson) {
    const user = JSON.parse(userJson);
    res.send(new ResponseData(SuccessCode.Sucessed,user))
  }
  } catch (error: any) {
    return next(new ErrorException("400",error.message));
  }
}

export const forgotPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email,oldPassword,newPassword } = req.body;

    const userExists = await UserModel.findOne({ email: email });
    if (!userExists) {
      return next(new ErrorException(ErrorCode.NotFound, { email }));
    }

    const isOldPasswordMatch = comparePassword(oldPassword,userExists.password);
      if (!isOldPasswordMatch) {
          return next(new ErrorException("400","Password lama tidak valid"));
      }

    const user = {
      name:userExists.name,
      email,
      password:newPassword,
    };
    
    const activationToken = createActivationToken(user);

    const activationCode = activationToken.activationCode;

    const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Atur ulang kata sandi Akun Anda",
          template: "forgot-password-mail.ejs",
          data,
        });

        res.status(201).json({
          message: `Silahkan periksa email Anda: ${user.email} untuk atur ulang kata sandi akun Anda!`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorException("400",error.message));
      }
  } catch (error:any) {
    return new ErrorException(ErrorCode.UnknownError)
  } 
}

export const newPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { activation_token, activation_code } = req.body as IActivationRequest;

    const newUser: IActivationUser = activateUser(
      activation_token,
      process.env.ACTIVATION_SECRET as string
    );
    
    if (newUser.activationCode !== activation_code) {
       return next(new ErrorException(ErrorCode.Unauthenticated, "Kode konfirmasi tidak valid"));
    }

    const { email, password } = newUser.user;

    const existUser = await UserModel.findOne({ email });

    if (!existUser) {
      return next(new ErrorException("400","Email tidak terdaftar"));
    }
    
    const hash = passwordHash(password);

    const data = {
      password: hash,
    };
    
    const updated = await UserModel.findByIdAndUpdate(
existUser._id,
{
  $set: data,
},
{ new: true }
    );
    res.send(new ResponseData(SuccessCode.Updated,updated))
  } catch (error: any) {
    return next(new ErrorException("400",error.message));
  }
}