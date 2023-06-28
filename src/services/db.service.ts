import { pool } from "../configs/db.config";

export async function query(sql: string, params: Array<any>) {
  const connection = await pool.getConnection();
  const [results]: any = await connection.query(sql, params);
  connection.release();

  return results;
}
