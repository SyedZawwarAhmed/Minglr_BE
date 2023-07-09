import { NextFunction, Request, Response } from "express";
import { getAllOfUser } from "../services/friend.service";

export async function getFriendsOfSignedInUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const getFriendsOfSignedInUserData: any = {
      userId: res.locals.user.id,
      page: req.query.page ? req.query.page : "1",
      limit: req.query.limit ? req.query.limit : "10",
    };
    res.status(200).json(await getAllOfUser(getFriendsOfSignedInUserData));
  } catch (error) {
    next(error);
  }
}
