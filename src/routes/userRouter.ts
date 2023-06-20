/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignup:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         pictureUrl:
 *           type: string
 *       example:
 *         name: Zawwar
 *         email: email
 *         password: password
 *         pictureUrl: pictureUrl
 *     UserSignin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         email: email
 *         password: password
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The users managing API
 * /api/users/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       200:
 *         description: OK.
 *       500:
 *         description: Some server error
 * /api/users/signin:
 *   post:
 *     summary: Sign in 
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignin'
 *     responses:
 *       200:
 *         description: OK.
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */

import express, {
  NextFunction,
  Request,
  Response,
  Router,
} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../db";
import { getResponseObject } from "../utils/getResponseObject";

const userRouter: Router = express.Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.send("This is users route.");
});

userRouter.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        pictureUrl: req.body.pictureUrl ? req.body.picture_url : null
      };
      const connection = await pool.getConnection();

      await connection.query(
        `INSERT into users (name, email, password, picture_url) VALUES (?, ?, ?, ?)`,
        [user.name, user.email, user.password, user.pictureUrl]
      );

      const [rows]: any = await connection.query(
        "SELECT * FROM users WHERE email = ?",
        [user.email]
      );
      connection.release();
      const responseData = { ...rows[0] };
      delete responseData.password;
      res.json(
        getResponseObject("User Successfully Registered.", {
          user: responseData,
        })
      );
    } catch (error) {
      next(Error("User already exists!"));
    }
  }
);

userRouter.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction) => {
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
            name: dbUser.name,
            email: dbUser.email,
            pictureUrl: dbUser.picture_url,
            createdAt: dbUser.created_at,
          };

          const token = jwt.sign(data, jwtSecretKey as string);
          res.statusCode = 200;
          res.send(
            getResponseObject("User Successfully Signed in.", { token })
          );
        } else {
          res.statusCode = 401;
          res.json({ error: "Invalid Credentials!" });
        }
      }
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;
