import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export function verifyToken(token: string) {
  let ddecode: any;
  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string,
    (error: any, decode: any): any => {
      if (error) return null;
      else ddecode = decode;
    }
  );
  return ddecode;
}
