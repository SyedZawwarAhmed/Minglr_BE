import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../configs/env.config";

export function generateToken (data: any): string {
    const jwtSecretKey = JWT_SECRET_KEY;
    return jwt.sign(data, jwtSecretKey as string);
}