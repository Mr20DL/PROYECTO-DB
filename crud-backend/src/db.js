import pg from "pg";
import "dotenv/config";

const pool = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

export const query = (text, params) => pool.query(text, params);
export const getClient = () => pool.connect(); // Obtener cliente del pool