require("dotenv").config();

const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10)
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "300", 10)

export const accessTokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
};

export const refreshTokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
};