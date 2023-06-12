import express, { Express, Request, Response } from "express";
import userRouter from "./routes/userRouter";

const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

app.listen(port, () => {
  console.log(`I am running at https://localhost:${port}`);
});

app.use("/api/users", userRouter);
