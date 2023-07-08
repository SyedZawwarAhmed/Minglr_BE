import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors"
import { swaggerDocs } from "./swagger";
import { userRouter, postRouter } from "./routes";

const app: Express = express();
const port = 5000;

app.use(cors())

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Minglr.");
});

app.listen(port, () => {
  console.log(`I am running at https://localhost:${port}`);
  swaggerDocs(app, port);
});

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  // Handle other errors
  res.status(400).json({ error: err.message });
});
