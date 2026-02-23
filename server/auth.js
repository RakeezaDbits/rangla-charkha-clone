import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { query } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const JWT_SECRET = process.env.JWT_SECRET || process.env.SUPABASE_JWT_SECRET;
const ADMIN_IDS = (process.env.ADMIN_USER_IDS || "").split(",").map((s) => s.trim()).filter(Boolean);

export function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (!JWT_SECRET) {
    return res.status(500).json({
      error: "Server: JWT not configured",
      hint: "Add JWT_SECRET=your-secret in server/.env or root .env",
    });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const userId = payload.sub;
    const email = payload.email || "";
    req.userId = userId;
    req.userEmail = email;
    req.userRole = null;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export async function ensureUser(req, res, next) {
  const userId = req.userId;
  const users = await query("SELECT id, role FROM users WHERE id = ?", [userId]);
  const user = users[0];
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }
  req.userRole = user.role;
  next();
}

export function adminOnly(req, res, next) {
  if (req.userRole !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
}

export function optionalAuth(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token || !JWT_SECRET) {
    req.userId = null;
    return next();
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.sub;
    req.userEmail = payload.email || "";
    next();
  } catch {
    req.userId = null;
    next();
  }
}
