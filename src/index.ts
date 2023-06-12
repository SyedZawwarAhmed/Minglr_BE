import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter";

const app: Express = express();
const port = 3000;

dotenv.config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

app.listen(port, () => {
  console.log(`I am running at https://localhost:${port}`);
});

app.use("/api/users", userRouter);

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  // Handle other errors
  res.status(500).json({ error: err.message });
});
