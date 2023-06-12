import express, {
  Express,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../db";

const app: Express = express();
const userRouter: Router = express.Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.send("This is users route.");
});

userRouter.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      };
      const connection = await pool.getConnection();
      await connection.query(
        `INSERT into users (name, email, password) VALUES (?, ?, ?)`,
        [user.name, user.email, user.password]
      );
      const [rows] = await connection.query("SELECT * FROM users");
      connection.release();
      res.json(rows);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post("/generateToken", (req: Request, res: Response) => {
  // Validate User Here
  // Then generate JWT Token

  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const data = {
    time: Date(),
  };

  const token = jwt.sign(data, jwtSecretKey as string);

  res.send(token);
});

export default userRouter;
