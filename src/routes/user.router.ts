/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignup:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         pictureUrl:
 *           type: string
 *       example:
 *         firstName: Zawwar
 *         lastName: Ahmed
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
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */

import express, { Router } from "express";
import { signinUser, signupUser } from "../controllers/users";

const userRouter: Router = express.Router();

userRouter.post("/signup", signupUser);

userRouter.post("/signin", signinUser);

export default userRouter;
