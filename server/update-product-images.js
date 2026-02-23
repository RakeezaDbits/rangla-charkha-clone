/**
 * Placeholder wale products ki image_url DB mein update karta hai.
 * Run: node update-product-images.js
 */
import { query } from "./db.js";

const updates = [
  { name: "Black Casual Cotton Shirt", image_url: "/products/black-casual-shirt.png" },
  { name: "Beige Linen Trousers", image_url: "/products/beige-linen-trousers.png" },
  { name: "Coral Pink Casual Top", image_url: "/products/coral-pink-casual-top.png" },
];

async function run() {
  for (const u of updates) {
    const r = await query("UPDATE product SET image_url = ? WHERE name = ?", [u.image_url, u.name]);
    console.log(r.affectedRows ? `Updated: ${u.name}` : `Not found: ${u.name}`);
  }
  console.log("Done.");
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
