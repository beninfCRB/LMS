import jwt from 'jsonwebtoken';
import { ErrorException } from './response/error/error-exception.util';
import { ErrorCode } from './response/error/error-code.util';
import { IUser } from '../models/user.model';
require("dotenv").config();

const jwtAccessKey:any  = process.env.ACCESS_KEY;
const jwtRefreshKey:any = process.env.REFRESH_KEY;

export const generateAccessToken = (user: IUser): string => {
  const token = jwt.sign({ _id: user._id, email: user.email }, jwtAccessKey, {
    expiresIn: '2h',
  });

  return token;
};

export const generateRefreshToken = (user: IUser): string => {
  const token = jwt.sign({ _id: user._id, email: user.email }, jwtRefreshKey, {
    expiresIn: '7d',
  });

  return token;
};

export const verifyToken = (token: string): { _id: string; email: string } => {
  try {
    const tokenData = jwt.verify(token, jwtAccessKey);
    return tokenData as { _id: string; email: string };
  } catch (error) {
    throw new ErrorException(ErrorCode.Unauthenticated);
  }
};