import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../../configs/db.config";
import { getResponseObject } from "../../utils/getResponseObject";

async function signupUser(req: Request, res: Response, next: NextFunction) {
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

export default signupUser;
