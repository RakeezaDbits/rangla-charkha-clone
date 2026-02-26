import { query } from "../db.js";
import { Router } from "express";
import { authMiddleware, ensureUser, adminOnly } from "../auth.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const router = Router();

router.post("/", authMiddleware, ensureUser, async (req, res) => {
  try {
    const userId = req.userId;
    const { total, shipping_name, shipping_phone, shipping_address, shipping_city, items } = req.body;
    if (!items?.length || total == null) {
      return res.status(400).json({ error: "total and items required" });
    }
    const orderId = crypto.randomUUID();
    await query(
      `INSERT INTO orders (id, user_id, total, shipping_name, shipping_phone, shipping_address, shipping_city, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        orderId,
        userId,
        Number(total),
        shipping_name || null,
        shipping_phone || null,
        shipping_address || null,
        shipping_city || null,
      ]
    );
    for (const it of items) {
      const itemId = crypto.randomUUID();
      await query(
        `INSERT INTO order_items (id, order_id, product_id, product_name, price, quantity, size)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          itemId,
          orderId,
          it.product_id || null,
          it.product_name || "Product",
          Number(it.price),
          Number(it.quantity) || 1,
          it.size || null,
        ]
      );
    }
    const [order] = await query("SELECT * FROM orders WHERE id = ?", [orderId]);
    res.status(201).json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/", authMiddleware, ensureUser, async (req, res) => {
  try {
    const userId = req.userId;
    const isAdmin = req.userRole === "admin";
    let sql = "SELECT * FROM orders";
    const params = [];
    if (!isAdmin) {
      sql += " WHERE user_id = ?";
      params.push(userId);
    }
    sql += " ORDER BY created_at DESC";
    const orders = await query(sql, params);
    const withItems = [];
    for (const o of orders) {
      const items = await query("SELECT * FROM order_items WHERE order_id = ?", [o.id]);
      withItems.push({ ...o, order_items: items });
    }
    res.json(withItems);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.patch("/:id", authMiddleware, ensureUser, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, tracking_number } = req.body;
    const updates = [];
    const params = [];
    if (status !== undefined) {
      updates.push("status = ?");
      params.push(status);
    }
    if (tracking_number !== undefined) {
      updates.push("tracking_number = ?");
      params.push(tracking_number);
    }
    if (updates.length === 0) return res.status(400).json({ error: "status or tracking_number required" });
    params.push(id);
    await query(`UPDATE orders SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, params);
    const [row] = await query("SELECT * FROM orders WHERE id = ?", [id]);
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/:id/confirm-payment", async (req, res) => {
  try {
    const { id } = req.params;
    const auth = req.headers.authorization;
    const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
    let userId = null;
    if (token && process.env.JWT_SECRET) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        userId = payload.sub;
      } catch (_) {}
    }
    const [order] = await query("SELECT id, user_id, status, shipping_phone FROM orders WHERE id = ?", [id]);
    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.status !== "pending") return res.status(400).json({ error: "Order already confirmed" });
    if (order.user_id != null) {
      if (userId !== order.user_id) return res.status(403).json({ error: "Forbidden" });
    } else {
      const phone = (req.body?.phone || req.query?.phone || "").toString().replace(/\D/g, "");
      const orderPhone = (order.shipping_phone || "").replace(/\D/g, "");
      if (!phone || orderPhone !== phone) return res.status(403).json({ error: "Phone required to confirm guest order" });
    }
    await query("UPDATE orders SET status = 'processing', updated_at = CURRENT_TIMESTAMP WHERE id = ?", [id]);
    const [updated] = await query("SELECT * FROM orders WHERE id = ?", [id]);
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/track", async (req, res) => {
  try {
    const order_id = req.query.order_id || req.query.orderId;
    const phone = (req.query.phone || "").toString().replace(/\D/g, "");
    if (!order_id || !phone) {
      return res.status(400).json({ error: "order_id and phone required" });
    }
    const [order] = await query("SELECT * FROM orders WHERE id = ?", [order_id]);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    const orderPhone = (order.shipping_phone || "").replace(/\D/g, "");
    if (orderPhone !== phone) {
      return res.status(403).json({ error: "Phone number does not match this order" });
    }
    const items = await query("SELECT * FROM order_items WHERE order_id = ?", [order_id]);
    res.json({ ...order, order_items: items });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
