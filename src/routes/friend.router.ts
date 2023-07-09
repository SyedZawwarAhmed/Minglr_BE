/**
 * @swagger
 * tags:
 *   name: Friend
 *   description: The friends managing API
 * /api/friends/getFriendsOfSignedInUser:
 *   get:
 *     summary: Get All Friends of Signed in User
 *     tags: [Friend]
 *     parameters:
 *     - name: page
 *       in: query
 *       required: false
 *       schema:
 *         type: number
 *     - name: limit
 *       in: query
 *       required: false
 *       schema:
 *         type: number
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
import { verifyUser } from "../middlewares";
import { getFriendsOfSignedInUser } from "../controllers/friend.controller";

const friendRouter: Router = express.Router();

friendRouter.get("/getFriendsOfSignedInUser", verifyUser, getFriendsOfSignedInUser);

export default friendRouter;