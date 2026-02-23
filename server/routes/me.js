import { query } from "../db.js";
import { Router } from "express";
import { authMiddleware, ensureUser } from "../auth.js";

const router = Router();

router.get("/", authMiddleware, ensureUser, async (req, res) => {
  try {
    const [user] = await query("SELECT id, email, full_name, role FROM users WHERE id = ?", [req.userId]);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
