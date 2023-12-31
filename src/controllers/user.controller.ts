import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { signin, signup, updatePictureUrl } from "../services/user.service";

export async function signupUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      pictureUrl: req.body.pictureUrl,
    };

    res.status(200).json(await signup(userData));
  } catch (error) {
    next(error);
  }
}

export async function signinUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    const { statusCode, response } = await signin(user);
    res.status(statusCode).json(response);
  } catch (error) {
    next(error);
  }
}

export async function updateUserPictureUrl(req: Request, res: Response, next: NextFunction) {
  try {
    const updateUserPictureUrlData = {
      userId: res.locals.user.id,
      pictureUrl: req.body.pictureUrl
    }
    res.status(200).json(await updatePictureUrl(updateUserPictureUrlData))
  } catch (error) {
    next(error)
  }
}
