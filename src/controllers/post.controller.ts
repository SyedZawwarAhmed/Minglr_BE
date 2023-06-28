import { NextFunction, Request, Response } from "express";
import { getAll, create, like, comment } from "../services/post.service";

export async function getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const page: any = req.query.page;
      const limit: any = req.query.limit;
      res.status(200).json(await getAll(page, limit));
    } catch (error) {
      next(error);
    }
  }

export async function createPost(req: Request, res: Response, next: NextFunction) {
  try {
    const postData = {
      userId: res.locals.user.id,
      content: req.body.content,
      mediaUrl: req.body.mediaUrl ? req.body.mediaUrl : null,
    };
    res.status(200).json(await create(postData));
  } catch (error) {
    next(error);
  }
}

export async function likePost(req: Request, res: Response, next: NextFunction) {
    try {
      const likeData = {
        userId: res.locals.user.id,
        postId: req.params.postId,
      };
      res.status(200).json(await like(likeData));
    } catch (error) {
      next(error);
    }
  }

export async function addCommentOnPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const commentData = {
      userId: res.locals.user.id,
      postId: req.params.postId,
      content: req.body.content,
    };

    res.status(200).json(await comment(commentData));
  } catch (error) {
    next(error);
  }
}
