import { query } from "../db.js";
import { Router } from "express";
import { authMiddleware, ensureUser } from "../auth.js";
import crypto from "crypto";

const router = Router();

router.use(authMiddleware, ensureUser);

router.get("/", async (req, res) => {
  try {
    const rows = await query(
      `SELECT c.*, p.name as product_name, p.price as product_price, p.image_url as product_image_url, p.category as product_category
       FROM cart_items c
       JOIN product p ON p.id = c.product_id
       WHERE c.user_id = ?
       ORDER BY c.created_at DESC`,
      [req.userId]
    );
    const cartItems = rows.map((r) => ({
      id: r.id,
      user_id: r.user_id,
      product_id: r.product_id,
      quantity: r.quantity,
      size: r.size,
      created_at: r.created_at,
      products: {
        id: r.product_id,
        name: r.product_name,
        price: r.product_price,
        image_url: r.product_image_url,
        category: r.product_category,
      },
    }));
    res.json(cartItems);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { product_id, quantity = 1, size = "M" } = req.body;
    if (!product_id) return res.status(400).json({ error: "product_id required" });
    const id = crypto.randomUUID();
    await query(
      "INSERT INTO cart_items (id, user_id, product_id, quantity, size) VALUES (?, ?, ?, ?, ?)",
      [id, req.userId, product_id, Number(quantity) || 1, size]
    );
    const [row] = await query(
      `SELECT c.*, p.name as product_name, p.price as product_price, p.image_url as product_image_url
       FROM cart_items c JOIN product p ON p.id = c.product_id WHERE c.id = ?`,
      [id]
    );
    res.status(201).json({
      id: row.id,
      product_id: row.product_id,
      quantity: row.quantity,
      size: row.size,
      products: { name: row.product_name, price: row.product_price, image_url: row.product_image_url },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    await query("UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?", [
      Number(quantity),
      id,
      req.userId,
    ]);
    const [row] = await query("SELECT * FROM cart_items WHERE id = ? AND user_id = ?", [id, req.userId]);
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/clear", async (req, res) => {
  try {
    await query("DELETE FROM cart_items WHERE user_id = ?", [req.userId]);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const r = await query("DELETE FROM cart_items WHERE id = ? AND user_id = ?", [id, req.userId]);
    if (r.affectedRows === 0) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
