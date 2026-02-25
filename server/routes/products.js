import { query } from "../db.js";
import { Router } from "express";
import { authMiddleware, ensureUser, adminOnly } from "../auth.js";
import crypto from "crypto";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    let sql = "SELECT * FROM product ORDER BY created_at DESC";
    const params = [];
    if (category) {
      sql = "SELECT * FROM product WHERE category = ? ORDER BY created_at DESC";
      params.push(category);
    }
    const rows = await query(sql, params);
    const products = rows.map((p) => ({
      ...p,
      in_stock: !!p.in_stock,
      sizes: p.sizes ? (typeof p.sizes === "string" ? JSON.parse(p.sizes) : p.sizes) : null,
    }));
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", authMiddleware, ensureUser, adminOnly, async (req, res) => {
  try {
    const id = crypto.randomUUID();
    const { name, price, category, description, image_url, in_stock, sizes, original_price } = req.body;
    await query(
      `INSERT INTO product (id, name, price, category, description, image_url, in_stock, sizes, original_price)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        name,
        Number(price),
        category || "lawn",
        description || null,
        image_url || null,
        in_stock !== false ? 1 : 0,
        sizes ? JSON.stringify(Array.isArray(sizes) ? sizes : [sizes]) : null,
        original_price != null ? Number(original_price) : null,
      ]
    );
    const [row] = await query("SELECT * FROM product WHERE id = ?", [id]);
    res.status(201).json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put("/:id", authMiddleware, ensureUser, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, description, image_url, in_stock, sizes, original_price } = req.body;
    await query(
      `UPDATE product SET name=?, price=?, category=?, description=?, image_url=?, in_stock=?, sizes=?, original_price=?, updated_at=CURRENT_TIMESTAMP WHERE id = ?`,
      [
        name,
        Number(price),
        category || "lawn",
        description || null,
        image_url || null,
        in_stock !== false ? 1 : 0,
        sizes ? JSON.stringify(Array.isArray(sizes) ? sizes : [sizes]) : null,
        original_price != null ? Number(original_price) : null,
        id,
      ]
    );
    const [row] = await query("SELECT * FROM product WHERE id = ?", [id]);
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/:id", authMiddleware, ensureUser, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const r = await query("DELETE FROM product WHERE id = ?", [id]);
    if (r.affectedRows === 0) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
