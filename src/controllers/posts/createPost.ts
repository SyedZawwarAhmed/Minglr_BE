import { NextFunction, Request, Response } from "express";
import { create } from "../../services/post.service";

async function createPost(req: Request, res: Response, next: NextFunction) {
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

export default createPost;
