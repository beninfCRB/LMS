import { NextFunction, Request, Response } from "express";
import { IUser, UserModel } from "../models/user.model";
import { ulid } from "ulid";
import { ErrorException } from "../utils/response/error/error-exception.util";
import { ErrorCode } from "../utils/response/error/error-code.util";
import { comparePassword, passwordHash } from "../utils/password.util";
import { ResponseData } from "../utils/response/success/success-response.util";
import { generateAccessToken, generateRefreshToken } from "../utils/token.util";
import { SuccessCode } from "../utils/response/success/success-code.util";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { redis } from "../utils/redis.util";
import { IActivationRequest, IActivationUser, IRegistrationBody } from "../types/global";
import { activateUser, createActivationToken } from "../utils/activate.util";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import path from "path";

export const SignUpController = async (req: Request, res: Response, next: NextFunction) => {
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
          subject: "Activate your account",
          template: "activation-mail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: `Please check your email: ${user.email} to activate your account!`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorException("400",error.message));
      }
  } catch (error:any) {
    return new ErrorException(ErrorCode.UnknownError)
  } 
}

export const ActivateUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { activation_token, activation_code } = req.body as IActivationRequest;

    const newUser: IActivationUser = activateUser(
      activation_token,
      process.env.ACTIVATION_SECRET as string
    );
    
    if (newUser.activationCode !== activation_code) {
       return next(new ErrorException("400","Invalid activation code"));
    }

    const { name, email, password } = newUser.user;

    const existUser = await UserModel.findOne({ email });

    if (existUser) {
      return next(new ErrorException("400","Email already exist"));
    }
    
    const hash = passwordHash(password);
    const createUser: IUser = {
      _id: ulid(),
      email,
      name,
      password: hash,
    };
    
    const created = await UserModel.create(createUser);
    res.send(new ResponseData(SuccessCode.Created,created))
  } catch (error: any) {
    return next(new ErrorException("400",error.message));
  }
}

export const SigInController = async (req: Request, res: Response, next: NextFunction) => {
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
      accessToken,
      refreshToken
    }
   
    redis.set(user._id, JSON.stringify(user) as any);

    res.send(new ResponseData(SuccessCode.Created,user));
  } catch (error:any) {
    return new ErrorException(ErrorCode.UnknownError)
  }
}

export const UpdatedAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refresh_token = req.headers["refresh-token"] as string;
    const decoded = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN as string
    ) as JwtPayload;

    const message = "Could not refresh token";
    if (!decoded) {
      return next(new ErrorException("400",message));
    }

    const session = await redis.get(decoded.id as string);

    if (!session) {
      return next(
        new ErrorException("400","Please login for access this resources!")
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

export const GetUserIdController = async (req: Request, res: Response, next: NextFunction) => {
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