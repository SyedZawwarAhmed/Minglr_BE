import express, { Router } from "express";
import { verifyUser } from "../middlewares";
import {
  addCommentOnPost,
  createPost,
  getAllPosts,
  likePost,
} from "../controllers/post.controller";

const postRouter: Router = express.Router();

postRouter.get("/getAllPosts", getAllPosts);

postRouter.post("/createPost", verifyUser, createPost);

postRouter.post("/like/:postId", verifyUser, likePost);

postRouter.post("/addComment/:postId", verifyUser, addCommentOnPost);

export default postRouter;
