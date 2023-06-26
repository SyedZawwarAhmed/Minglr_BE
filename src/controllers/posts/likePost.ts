import { NextFunction, Request, Response } from "express";
import { getResponseObject } from "../../utils/getResponseObject";
import { like } from "../../services/post.service";

async function likePost(req: Request, res: Response, next: NextFunction) {
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

export default likePost;
