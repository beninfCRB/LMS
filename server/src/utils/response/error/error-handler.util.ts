import { NextFunction, Request, Response } from "express";
import { ErrorException } from "./error-exception.util";
import { ErrorCode } from "./error-code.util";
import { ResponseModel } from "../response-model.util";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Error handling middleware called.');
    console.log('Path:', req.path);
    console.error('Error occured:', err);
    if (err instanceof ErrorException) {
        console.log('Error is known.');
        res.status(err.status).send(err);
    } else {
        // For unhandled errors.
        res.status(500).send({ code: ErrorCode.UnknownError, status: 500 } as ResponseModel);
    }
};