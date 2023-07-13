/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *         mediaUrl:
 *           type: string
 *       example:
 *         content: This is post content.
 *         mediaUrl: abc@xyx.com
 *     Comment:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *       example:
 *         content: This is a comment on a post.
 */

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: The posts managing API
 * /api/posts/getAllPosts:
 *   get:
 *     summary: Get All Posts
 *     tags: [Post]
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
 * /api/posts/getPostsOfSignedInUser:
 *   get:
 *     summary: Get All Posts
 *     tags: [Post]
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
 * /api/posts/createPost:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: OK.
 *       500:
 *         description: Some server error
 * /api/posts/like/{postId}:
 *   post:
 *     summary: Like a post
 *     tags: [Post]
 *     parameters:
 *     - name: postId
 *       in: path
 *       required: true
 *       schema:
 *         type: number
 *     responses:
 *       200:
 *         description: OK.
 *       500:
 *         description: Some server error
 * /api/posts/addComment/{postId}:
 *   post:
 *     summary: Add comment on a post
 *     tags: [Post]
 *     parameters:
 *     - name: postId
 *       in: path
 *       required: true
 *       schema:
 *         type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: OK.
 *       500:
 *         description: Some server error
 * /api/posts/getComments/{postId}:
 *   get:
 *     summary: Get all comments on a post
 *     tags: [Post]
 *     parameters:
 *     - name: postId
 *       in: path
 *       required: true
 *       schema:
 *         type: number
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
 *       500:
 *         description: Some server error
 */

import express, { Router } from "express";
import { verifyUser } from "../middlewares";
import {
  addCommentOnPost,
  createPost,
  getAllPosts,
  getCommentsOnPost,
  getPostsOfSignedInUser,
  likePost,
} from "../controllers/post.controller";

const postRouter: Router = express.Router();

postRouter.get("/getAllPosts", verifyUser, getAllPosts);

postRouter.get("/getPostsOfSignedInUser", verifyUser, getPostsOfSignedInUser)

postRouter.post("/createPost", verifyUser, createPost);

postRouter.post("/like/:postId", verifyUser, likePost);

postRouter.post("/addComment/:postId", verifyUser, addCommentOnPost);

postRouter.get("/getComments/:postId", getCommentsOnPost)

export default postRouter;
