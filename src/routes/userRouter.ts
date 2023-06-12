import express, { Express, Request, Response, Router } from "express";

const app: Express = express();
const userRouter: Router = express.Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.send("This is users route.");
});

export default userRouter;
