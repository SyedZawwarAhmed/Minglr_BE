import { NextFunction, Request, Response } from "express";
import pool from "../../configs/db.config";
import { getResponseObject } from "../../utils/getResponseObject";

async function addCommentOnPost(
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
    
    res
      .status(200)
      .json();
  } catch (error) {
    next(error);
  }
}

export default addCommentOnPost