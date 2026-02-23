import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { query } from "../db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const JWT_SECRET = process.env.JWT_SECRET || process.env.SUPABASE_JWT_SECRET || "change-me-in-production";
const ADMIN_IDS = (process.env.ADMIN_USER_IDS || "").split(",").map((s) => s.trim()).filter(Boolean);
const SALT_ROUNDS = 10;

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, full_name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    const existing = await query("SELECT id FROM users WHERE email = ?", [email.trim().toLowerCase()]);
    if (existing.length) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const id = crypto.randomUUID();
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const count = await query("SELECT COUNT(*) as c FROM users");
    const isAdmin = count[0].c === 0 || ADMIN_IDS.includes(id);
    await query(
      "INSERT INTO users (id, email, full_name, password_hash, role) VALUES (?, ?, ?, ?, ?)",
      [id, email.trim().toLowerCase(), full_name || null, hash, isAdmin ? "admin" : "user"]
    );
    const token = jwt.sign(
      { sub: id, email: email.trim().toLowerCase(), role: isAdmin ? "admin" : "user" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      token,
      user: { id, email: email.trim().toLowerCase(), full_name: full_name || null, role: isAdmin ? "admin" : "user" },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }
    const users = await query("SELECT id, email, full_name, password_hash, role FROM users WHERE email = ?", [
      email.trim().toLowerCase(),
    ]);
    if (!users.length) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const user = users[0];
    if (!user.password_hash) {
      return res.status(401).json({ error: "Please use the new login. Reset password or contact support." });
    }
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      token,
      user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
