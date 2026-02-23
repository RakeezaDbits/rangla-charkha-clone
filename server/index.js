import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { initDb } from "./db.js";
import authRouter from "./routes/auth.js";
import checkoutRouter from "./routes/checkout.js";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import cartRouter from "./routes/cart.js";
import wishlistRouter from "./routes/wishlist.js";
import meRouter from "./routes/me.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/me", meRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);

app.get("/api/health", (req, res) => res.json({ ok: true }));

async function start() {
  const secret = process.env.JWT_SECRET || process.env.SUPABASE_JWT_SECRET;
  if (!secret || secret.trim() === "" || secret === "change-me-in-production") {
    console.warn("\n⚠️  Set JWT_SECRET in .env for production. Using default for dev.\n");
  }
  await initDb();
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});
