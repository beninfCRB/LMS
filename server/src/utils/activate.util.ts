import jwt, { Secret } from "jsonwebtoken";
import { IActivationToken, IActivationUser } from "../types/global";
require("dotenv").config();

export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  
    const token = jwt.sign(
      {
        user,
        activationCode,
      },
      process.env.ACTIVATION_SECRET as Secret,
      {
        expiresIn: "5m",
      }
    );
  
    return { token, activationCode };
  };

export const activateUser = (token:string,secret:string):IActivationUser =>{
  const newUser: IActivationUser = jwt.verify(
    token,
    secret
  ) as IActivationUser;

  return newUser;
}