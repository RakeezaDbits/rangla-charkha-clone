import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import GoldButton from "@/components/GoldButton";

const products = [
  { name: "Embroidered Green Lawn Suit", price: "Rs. 6,900", image: product1 },
  { name: "Golden Beige Premium Suit", price: "Rs. 5,700", image: product2 },
  { name: "Orchid Blossom Printed Suit", price: "Rs. 4,200", image: product3 },
  { name: "Sky Blue Casual Kurta", price: "Rs. 4,200", image: product4 },
  { name: "Royal Beige Summer Suit", price: "Rs. 5,500", image: product2 },
  { name: "Emerald Garden Lawn Suit", price: "Rs. 6,200", image: product1 },
];

const LawnCollection = () => {
  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-4xl text-foreground text-center mb-4">Latest Lawn Collection</h1>
        <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Upgrade your summer wardrobe with our premium lawn collection. Designed with breathable fabric and elegant cuts, perfect for casual gatherings and everyday wear.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <div key={i} className="group bg-card border border-border rounded-sm overflow-hidden transition-all duration-300 hover:border-primary/40">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-display text-sm text-foreground">{product.name}</h3>
                <p className="font-body text-sm text-primary">{product.price}</p>
                <GoldButton variant="outline" className="!px-4 !py-2 !text-xs w-full text-center">Add to Cart</GoldButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default LawnCollection;
