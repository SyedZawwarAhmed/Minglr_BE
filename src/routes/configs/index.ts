import dotenv from 'dotenv';

dotenv.config()

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const TOKEN_HEADER_KEY = process.env.TOKEN_HEADER_KEY;
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_SOCKET_PATH = process.env.DB_SOCKET_PATH;