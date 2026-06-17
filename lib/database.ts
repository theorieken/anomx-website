import { readFile } from "node:fs/promises";
import path from "node:path";
import mysql from "mysql2/promise";

export type DatabaseConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

const configPath = path.join(process.cwd(), "config", "database.config.json");

let pool: mysql.Pool | null = null;

export async function loadDatabaseConfig(): Promise<DatabaseConfig> {
  const rawConfig = await readFile(configPath, "utf-8");
  return JSON.parse(rawConfig) as DatabaseConfig;
}

export async function getPool(): Promise<mysql.Pool> {
  if (pool) {
    return pool;
  }

  const config = await loadDatabaseConfig();
  pool = mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return pool;
}

export async function ensureUsersTable(): Promise<void> {
  const p = await getPool();
  await p.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function countUsers(): Promise<number> {
  const p = await getPool();
  const [rows] = await p.execute<mysql.RowDataPacket[]>(
    "SELECT COUNT(*) AS count FROM users"
  );
  return rows[0].count;
}

export async function createUser(
  name: string,
  email: string,
  passwordHash: string
): Promise<void> {
  const p = await getPool();
  await p.execute(
    "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
    [name, email, passwordHash]
  );
}

export async function findUserByEmail(
  email: string
): Promise<{ id: number; name: string; email: string; password_hash: string } | null> {
  const p = await getPool();
  const [rows] = await p.execute<mysql.RowDataPacket[]>(
    "SELECT id, name, email, password_hash FROM users WHERE email = ?",
    [email]
  );
  if (rows.length === 0) {
    return null;
  }
  return rows[0] as { id: number; name: string; email: string; password_hash: string };
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
