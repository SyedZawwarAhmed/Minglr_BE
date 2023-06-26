import { NextFunction, Request, Response } from "express";
import pool from "../../configs/db.config";
import { getPaginationQuery } from "../../utils/getPaginationQuery";
import { getResponseObject } from "../../utils/getResponseObject";

async function getAllPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const page: any = req.query.page;
    const limit: any = req.query.limit;

    const connection = await pool.getConnection();
    const [rows]: any = await connection.query(
      getPaginationQuery("posts", parseInt(page) - 1, parseInt(limit))
    );
    connection.release();
    res.status(200).json(getResponseObject("All Posts", { posts: rows }));
  } catch (error) {
    next(error);
  }
}

export default getAllPosts;
