import express, { NextFunction, Request, Response, Router } from "express";
import pool from "../configs/db.config";
import { getResponseObject } from "../utils/getResponseObject";
import { verifyUser } from "../middlewares/verifyUser";
import { getPaginationQuery } from "../utils/getPaginationQuery";

const postRouter: Router = express.Router();

postRouter.get("/", (req: Request, res: Response) => {
  res.send("This is posts route.");
});

postRouter.get(
  "/getAllPosts",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page: any = req.query.page;
      const limit: any = req.query.limit;

      const connection = await pool.getConnection();
      const [rows]: any = await connection.query(
        getPaginationQuery("posts", parseInt(page) - 1, parseInt(limit))
      );
      connection.release();
      res.status(200).json(getResponseObject("All Posts", { posts: rows }));
    } catch (error) {
      next(error);
    }
  }
);

postRouter.post(
  "/createPost",
  verifyUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postData = {
        userId: res.locals.user.id,
        content: req.body.content,
        mediaUrl: req.body.mediaUrl ? req.body.mediaUrl : null,
      };
      const connection = await pool.getConnection();
      await connection.query(
        "INSERT into posts (user_id, content, media_url) VALUES (?, ?, ?)",
        [postData.userId, postData.content, postData.mediaUrl]
      );
      connection.release();
      res
        .status(200)
        .json(getResponseObject("Post successfully created.", null));
    } catch (error) {
      next(error);
    }
  }
);

postRouter.post(
  "/like/:postId",
  verifyUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const likeData = {
        userId: res.locals.user.id,
        postId: req.params.postId,
      };
      const connection = await pool.getConnection();
      await connection.query(
        "INSERT into likes (user_id, post_id) VALUES (?, ?)",
        [likeData.userId, likeData.postId]
      );
      await connection.query(
        "UPDATE posts SET num_likes = num_likes + 1 WHERE id = ?",
        [likeData.postId]
      );
      connection.release();
      res.status(200).json(getResponseObject("Post successfully liked.", null));
    } catch (error) {
      next(error);
    }
  }
);

postRouter.post(
  "/addComment/:postId",
  verifyUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commentData = {
        userId: res.locals.user.id,
        postId: req.params.postId,
        content: req.body.content,
      };
      const connection = await pool.getConnection();
      await connection.query(
        "INSERT into comments (user_id, post_id, content) VALUES (?, ?, ?)",
        [commentData.userId, commentData.postId, commentData.content]
      );
      await connection.query(
        "UPDATE posts SET num_comments = num_comments + 1 WHERE id = ?",
        [commentData.postId]
      );
      connection.release();
      res
        .status(200)
        .json(getResponseObject("Post successfully commented on.", null));
    } catch (error) {
      next(error);
    }
  }
);

export default postRouter;
