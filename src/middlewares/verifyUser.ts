import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../configs/env.config";

function verifyUser(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  jwt.verify(
    token as string,
    JWT_SECRET_KEY as string,
    (error: any, decode: any): any => {
      if (error) {
        return next(error);
      } else {
        res.locals.user = decode;
        return next();
      }
    }
  );
}

export default verifyUser;
