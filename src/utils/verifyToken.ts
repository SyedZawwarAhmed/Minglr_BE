import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../routes/configs";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.body.token
  jwt.verify(
    token,
    JWT_SECRET_KEY as string,
    (error: any, decode: any): any => {
      if (error) {
        return next(error)
      } else {
        res.locals.user = decode
        return next()
      }
    }
  );
}
