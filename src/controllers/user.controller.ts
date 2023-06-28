import { NextFunction, Request, Response } from "express";
import { pool } from "../configs/db.config";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { getResponseObject } from "../utils/getResponseObject";

export async function signinUser(req: Request, res: Response, next: NextFunction) {
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

export async function signupUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        pictureUrl: req.body.pictureUrl ? req.body.picture_url : null,
      };
      const connection = await pool.getConnection();
  
      await connection.query(
        `INSERT into users (first_name, last_name, email, password, picture_url) VALUES (?, ?, ?, ?, ?)`,
        [
          userData.firstName,
          userData.lastName,
          userData.email,
          userData.password,
          userData.pictureUrl,
        ]
      );
  
      const [rows]: any = await connection.query(
        "SELECT * FROM users WHERE email = ?",
        [userData.email]
      );
      connection.release();
      const responseData = { ...rows[0] };
      delete responseData.password;
      res.status(200).json(
        getResponseObject("User Successfully Registered.", {
          user: responseData,
        })
      );
    } catch (error) {
      next(error);
    }
  }