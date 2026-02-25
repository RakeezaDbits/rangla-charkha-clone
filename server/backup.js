/**
 * Database backup — ek SQL file mein export.
 * Run: node backup.js
 * Output: server/backups/rangla_charkha_YYYY-MM-DD_HH-mm-ss.sql
 */
import { createConnection } from "mysql2/promise";
import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function backup() {
  const dbName = process.env.MYSQL_DATABASE || "rangla_charkha";
  const conn = await createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: dbName,
    charset: "utf8mb4",
  });

  const outDir = path.join(__dirname, "backups");
  const date = new Date().toISOString().slice(0, 19).replace("T", "_").replace(/:/g, "-");
  const filename = `${dbName}_${date}.sql`;
  const filepath = path.join(outDir, filename);

  let sql = "";
  sql += `-- Rangla Charkha DB Backup - ${new Date().toISOString()}\n`;
  sql += `-- Database: ${dbName}\n\n`;
  sql += "SET NAMES utf8mb4;\nSET FOREIGN_KEY_CHECKS = 0;\n\n";

  const [tables] = await conn.query("SHOW TABLES");
  const tableKey = `Tables_in_${dbName}`;

  for (const row of tables) {
    const table = row[tableKey];
    const [createRows] = await conn.query(`SHOW CREATE TABLE \`${table}\``);
    const createSql = createRows[0]["Create Table"];
    sql += `DROP TABLE IF EXISTS \`${table}\`;\n`;
    sql += createSql + ";\n\n";

    const [rows] = await conn.query(`SELECT * FROM \`${table}\``);
    if (rows.length === 0) {
      sql += `-- Table \`${table}\` is empty\n\n`;
      continue;
    }

    const columns = Object.keys(rows[0]);
    const colList = columns.map((c) => "`" + c + "`").join(", ");
    for (const r of rows) {
      const values = columns.map((col) => {
        const v = r[col];
        if (v === null) return "NULL";
        if (typeof v === "number") return String(v);
        if (v instanceof Date) return conn.escape(v.toISOString().slice(0, 19).replace("T", " "));
        return conn.escape(String(v));
      });
      sql += `INSERT INTO \`${table}\` (${colList}) VALUES (${values.join(", ")});\n`;
    }
    sql += "\n";
  }

  sql += "SET FOREIGN_KEY_CHECKS = 1;\n";
  await conn.end();

  await writeFile(filepath, sql, "utf8");
  console.log("Backup saved:", filepath);
  return filepath;
}

import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, ".env") });

backup().catch((e) => {
  console.error(e);
  process.exit(1);
});
