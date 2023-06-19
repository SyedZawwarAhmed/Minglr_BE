import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.body.token
  let ddecode: any;
  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string,
    (error: any, decode: any): any => {
      if (error) {
        return next(error)
      }
      else {
        ddecode = decode;
      }
    }
  );
  return ddecode;
}
