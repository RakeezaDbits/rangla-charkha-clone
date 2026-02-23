import { query } from "../db.js";
import { Router } from "express";
import { authMiddleware, ensureUser } from "../auth.js";
import crypto from "crypto";

const router = Router();

router.use(authMiddleware, ensureUser);

router.get("/", async (req, res) => {
  try {
    const rows = await query(
      `SELECT w.*, p.name, p.price, p.image_url, p.category
       FROM wishlist_items w
       JOIN product p ON p.id = w.product_id
       WHERE w.user_id = ?
       ORDER BY w.created_at DESC`,
      [req.userId]
    );
    const list = rows.map((r) => ({
      id: r.id,
      product_id: r.product_id,
      created_at: r.created_at,
      products: { id: r.product_id, name: r.name, price: r.price, image_url: r.image_url, category: r.category },
    }));
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/toggle", async (req, res) => {
  try {
    const { product_id } = req.body;
    if (!product_id) return res.status(400).json({ error: "product_id required" });
    const existing = await query("SELECT id FROM wishlist_items WHERE user_id = ? AND product_id = ?", [
      req.userId,
      product_id,
    ]);
    if (existing.length) {
      await query("DELETE FROM wishlist_items WHERE id = ?", [existing[0].id]);
      return res.json({ added: false });
    }
    const id = crypto.randomUUID();
    await query("INSERT INTO wishlist_items (id, user_id, product_id) VALUES (?, ?, ?)", [id, req.userId, product_id]);
    res.status(201).json({ added: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const r = await query("DELETE FROM wishlist_items WHERE user_id = ? AND product_id = ?", [req.userId, productId]);
    if (r.affectedRows === 0) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
