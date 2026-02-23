import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.MYSQL_DATABASE || "rangla_charkha";

async function ensureDatabase() {
  const conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
  });
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await conn.query(`ALTER DATABASE \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await conn.end();
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: dbName,
  charset: "utf8mb4",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export async function initDb() {
  await ensureDatabase();
  await pool.query(`CREATE TABLE IF NOT EXISTS \`product\` (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      category VARCHAR(50) NOT NULL,
      description TEXT,
      image_url VARCHAR(500),
      in_stock TINYINT(1) DEFAULT 1,
      sizes JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
  await pool.query(`CREATE TABLE IF NOT EXISTS \`users\` (
      id VARCHAR(36) PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      full_name VARCHAR(255),
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('user','admin') DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
  try {
    await pool.query("ALTER TABLE `users` ADD COLUMN password_hash VARCHAR(255)");
  } catch (_) {}
  try {
    await pool.query("ALTER TABLE `users` ADD UNIQUE KEY unique_email (email)");
  } catch (_) {}
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`orders\` (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      status VARCHAR(50) DEFAULT 'pending',
      total DECIMAL(10,2) NOT NULL,
      shipping_name VARCHAR(255),
      shipping_phone VARCHAR(50),
      shipping_address TEXT,
      shipping_city VARCHAR(100),
      tracking_number VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`order_items\` (
      id VARCHAR(36) PRIMARY KEY,
      order_id VARCHAR(36) NOT NULL,
      product_id VARCHAR(36),
      product_name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      quantity INT NOT NULL,
      size VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`cart_items\` (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      product_id VARCHAR(36) NOT NULL,
      quantity INT DEFAULT 1,
      size VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`wishlist_items\` (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      product_id VARCHAR(36) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("MySQL tables ready.");
}

export { pool };
