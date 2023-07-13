import { NextFunction, Request, Response } from "express";
import {
  getAll,
  getAllOfUser,
  create,
  like,
  comment,
  getComments,
} from "../services/post.service";

export async function getAllPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const getAllPostsData: any = {
      userId: res.locals.user.id,
      page: req.query.page ? req.query.page : "1",
      limit: req.query.limit ? req.query.limit : "10",
    };
    res.status(200).json(await getAll(getAllPostsData));
  } catch (error) {
    next(error);
  }
}

export async function getPostsOfSignedInUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const getPostsOfSignedInUserData: any = {
      userId: res.locals.user.id,
      page: req.query.page ? req.query.page : "1",
      limit: req.query.limit ? req.query.limit : "10",
    };
    res.status(200).json(await getAllOfUser(getPostsOfSignedInUserData));
  } catch (error) {
    next(error);
  }
}

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

export async function likePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

export async function getCommentsOnPost(req: Request, res: Response, next: NextFunction) {
  try {
    const getCommentsData: any = {
      postId: req.params.postId,
      page: req.query.page ? req.query.page : "1",
      limit: req.query.limit ? req.query.limit : "10",
    }

    res.status(200).json(await getComments(getCommentsData))
  } catch (error) {
    next(error)
  }
}
