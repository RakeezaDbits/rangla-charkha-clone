import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import GoldButton from "@/components/GoldButton";

const products = [
  { name: "Sky Blue Casual Kurta", price: "Rs. 4,200", image: product4 },
  { name: "Orchid Blossom Printed Suit", price: "Rs. 4,200", image: product3 },
  { name: "Lavender Dream Kurta", price: "Rs. 3,800", image: product3 },
  { name: "Powder Blue Everyday Suit", price: "Rs. 3,500", image: product4 },
];

const CasualWear = () => {
  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-4xl text-foreground text-center mb-4">Casual Wear</h1>
        <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Modern casual outfits for everyday elegance. Comfortable, stylish, and perfect for women aged 18–45.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div key={i} className="group bg-card border border-border rounded-sm overflow-hidden transition-all duration-300 hover:border-primary/40">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-display text-sm text-foreground">{product.name}</h3>
                <p className="font-body text-sm text-primary">{product.price}</p>
                <GoldButton variant="outline" className="!px-4 !py-2 !text-xs w-full text-center">View Collection</GoldButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CasualWear;
