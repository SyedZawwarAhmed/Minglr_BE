import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../../configs/db.config";
import jwt from "jsonwebtoken";
import { getResponseObject } from "../../utils/getResponseObject";

async function signinUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    const connection = await pool.getConnection();
    const [rows]: any = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [user.email]
    );
    if (rows.length > 0) {
      const dbUser = rows[0];
      const isPasswordCorrect = await bcrypt.compare(
        user.password,
        dbUser.password
      );
      if (isPasswordCorrect) {
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const data = {
          time: Date(),
          id: dbUser.id,
          firstName: dbUser.first_name,
          lastName: dbUser.last_name,
          email: dbUser.email,
          pictureUrl: dbUser.picture_url,
          createdAt: dbUser.created_at,
        };

        const token = jwt.sign(data, jwtSecretKey as string);
        res
          .status(200)
          .json(getResponseObject("User Successfully Signed in.", { token }));
      } else {
        res.status(401).json({ error: "Invalid Credentials!" });
      }
    } else {
      res.status(400).json({ error: "User not registered!" });
    }
  } catch (error) {
    next(error);
  }
}

export default signinUser;
