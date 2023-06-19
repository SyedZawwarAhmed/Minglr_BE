import mysql from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "./routes/configs";

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
