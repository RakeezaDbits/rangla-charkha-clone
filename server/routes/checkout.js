import Stripe from "stripe";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { query } from "../db.js";
import { authMiddleware, ensureUser } from "../auth.js";
import { Router } from "express";
import crypto from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

function getStripe() {
  const secret = process.env.STRIPE_SECRET?.trim();
  if (!secret) return null;
  return new Stripe(secret);
}
const router = Router();

router.post("/create-payment-intent", authMiddleware, ensureUser, async (req, res) => {
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
    const stripe = getStripe();
    if (!stripe) return res.status(503).json({ error: "Payments not configured (STRIPE_SECRET missing)" });
    const amountPaisa = Math.round(Number(total) * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.max(amountPaisa, 100),
      currency: "pkr",
      metadata: { orderId },
      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: paymentIntent.client_secret, orderId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
