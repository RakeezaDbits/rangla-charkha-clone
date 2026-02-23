import { query, initDb } from "./db.js";
import crypto from "crypto";

// Har category ke 3–3 products: Lawn 3, Casual 3
const products = [
  // ——— Lawn (3) ———
  {
    name: "Maroon Gold Embroidered Kurta Set",
    price: 8990,
    category: "lawn",
    description: "Elegant maroon kurta set with exquisite gold floral and leaf embroidery. V-neck with heavy embroidery panel, full sleeves with embroidered cuffs. Matching straight trousers. Perfect for festive and semi-formal occasions.",
    image_url: "/products/maroon-kurta-gold-embroidery.png",
    in_stock: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Baby Pink Lace Trim Kurta Set",
    price: 7490,
    category: "lawn",
    description: "Soft baby pink two-piece set with delicate white lace and pearl embellishments. Round neck, full sleeves with floral embroidery and scalloped lace cuffs. Matching straight trousers.",
    image_url: "/products/pink-kurta-lace.png",
    in_stock: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Sage Green Embroidered Kurta Set",
    price: 8290,
    category: "lawn",
    description: "Pastel sage green kurta with rich floral embroidery in pink, peach, orange and yellow on yoke, cuffs and hem. Round neck with small V-slit and decorative tassels. Straight-cut trousers.",
    image_url: "/products/green-kurta-embroidered.png",
    in_stock: true,
    sizes: ["S", "M", "L", "XL"],
  },
  // ——— Casual (3) ———
  {
    name: "Black Casual Cotton Shirt",
    price: 2490,
    category: "casual",
    description: "Comfortable black cotton shirt for casual wear. Relaxed fit, full sleeves. Versatile for office or weekend.",
    image_url: "/products/black-casual-shirt.png",
    in_stock: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Beige Linen Trousers",
    price: 3290,
    category: "casual",
    description: "High-waist beige linen trousers. Loose fit, breathable fabric. Pairs well with kurtas or tops.",
    image_url: "/products/beige-linen-trousers.png",
    in_stock: true,
    sizes: ["S", "M", "XL"],
  },
  {
    name: "Coral Pink Casual Top",
    price: 1990,
    category: "casual",
    description: "Solid coral pink casual top. Round neck, short sleeves. Light cotton blend for daily wear.",
    image_url: "/products/coral-pink-casual-top.png",
    in_stock: true,
    sizes: ["S", "M", "L", "XL"],
  },
];

async function seed() {
  try {
    await query("SELECT 1");
    console.log("MySQL connected.");
  } catch (e) {
    console.error("MySQL connection failed. Check server/.env (MYSQL_*). Error:", e.message);
    process.exit(1);
  }

  await initDb();

  const existing = await query("SELECT COUNT(*) as c FROM product");
  if (existing[0].c > 0) {
    console.log("Products already exist. Skipping seed.");
    process.exit(0);
    return;
  }

  for (const p of products) {
    const id = crypto.randomUUID();
    await query(
      `INSERT INTO product (id, name, price, category, description, image_url, in_stock, sizes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        p.name,
        p.price,
        p.category,
        p.description || null,
        p.image_url || null,
        p.in_stock ? 1 : 0,
        p.sizes ? JSON.stringify(p.sizes) : null,
      ]
    );
    console.log("Inserted:", p.name, "(" + p.category + ")");
  }

  console.log("Seed done. Lawn: 3, Casual: 3. Total:", products.length);
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
