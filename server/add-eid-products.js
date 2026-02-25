/**
 * 4 Eid sale products add karta hai (30% off).
 * Run: node add-eid-products.js
 */
import { query, initDb } from "./db.js";
import crypto from "crypto";

const products = [
  {
    name: "Mustard Yellow Lace Trim Kurta Set",
    original_price: 4800,
    price: 3360,
    category: "lawn",
    description: "Vibrant mustard yellow kurta set with white lace on cuffs and hem. V-neck with subtle embroidery. Matching straight trousers. Eid special.",
    image_url: "/products/mustard-lace-kurta.png",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Maroon Gold Embroidered Kurta Set",
    original_price: 5200,
    price: 3640,
    category: "lawn",
    description: "Deep maroon kurta with rich golden embroidery on neckline, cuffs and hem. Matching trousers. Elegant for Eid and festivities.",
    image_url: "/products/maroon-gold-embroidery-kurta.png",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Light Pink Dupatta Kurta Set",
    original_price: 4500,
    price: 3150,
    category: "lawn",
    description: "Pastel pink three-piece with sheer dupatta. V-neck with pearl and lace trim. Floral embroidery on hem. Eid special.",
    image_url: "/products/pink-dupatta-kurta.png",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Sage Green Embroidered Kurta Set",
    original_price: 5200,
    price: 3640,
    category: "lawn",
    description: "Light sage green kurta with floral embroidery in pink, coral and yellow. Boat neck with tassels. Matching trousers.",
    image_url: "/products/sage-green-embroidered-kurta.png",
    sizes: ["S", "M", "L", "XL"],
  },
];

async function run() {
  await initDb();
  for (const p of products) {
    const id = crypto.randomUUID();
    await query(
      `INSERT INTO product (id, name, price, original_price, category, description, image_url, in_stock, sizes)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)`,
      [
        id,
        p.name,
        p.price,
        p.original_price,
        p.category,
        p.description || null,
        p.image_url || null,
        p.sizes ? JSON.stringify(p.sizes) : null,
      ]
    );
    console.log("Added:", p.name, "Rs.", p.price, "(30% off from Rs.", p.original_price + ")");
  }
  console.log("Done. 4 Eid sale products added.");
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
