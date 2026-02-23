import { Star, Truck, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-model.jpg";
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
];

const features = [
  { icon: Sparkles, title: "Premium Quality Fabric", desc: "Breathable lawn crafted for Pakistan's climate" },
  { icon: Star, title: "Trendy & Elegant Designs", desc: "Modern silhouettes with timeless appeal" },
  { icon: ShieldCheck, title: "Affordable Luxury", desc: "High-end fashion at accessible prices" },
  { icon: Truck, title: "Fast Nationwide Delivery", desc: "3–5 working days across Pakistan" },
  { icon: RefreshCw, title: "Easy Exchange Policy", desc: "7-day hassle-free exchange" },
];

const Index = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Premium Lawn Collection" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl space-y-6 animate-fade-in">
            <h1 className="font-display text-4xl md:text-6xl leading-tight text-foreground">
              Luxury Lawn &<br />Casual Wear
            </h1>
            <p className="font-elegant text-xl md:text-2xl text-muted-foreground tracking-wide">
              Soft · Elegant · Affordable
            </p>
            <div className="flex gap-4 pt-4">
              <GoldButton to="/lawn-collection">Shop Now</GoldButton>
              <GoldButton to="/casual-wear" variant="outline">View Collections</GoldButton>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-12">
            New Arrivals
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <div
                key={i}
                className="group bg-card border border-border rounded-sm overflow-hidden transition-all duration-300 hover:border-primary/40"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-display text-sm text-foreground">{product.name}</h3>
                  <p className="font-body text-sm text-primary">{product.price}</p>
                  <GoldButton variant="outline" className="!px-4 !py-2 !text-xs w-full text-center">
                    Add to Cart
                  </GoldButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-4">
            Why Choose Rangla Charkha?
          </h2>
          <p className="text-center font-body text-muted-foreground mb-12">
            Trusted by modern women across Pakistan · Rated 4.8/5 by our customers
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((f, i) => (
              <div key={i} className="text-center p-6 bg-card border border-border rounded-sm hover:border-primary/40 transition-all">
                <f.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-display text-sm text-foreground mb-2">{f.title}</h3>
                <p className="font-body text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            Latest Lawn Collection in Pakistan
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Upgrade your summer wardrobe with our premium lawn collection. Designed with breathable fabric and elegant cuts, perfect for casual gatherings and everyday wear.
          </p>
          <GoldButton to="/lawn-collection">Shop Lawn Collection</GoldButton>
        </div>
      </section>
    </main>
  );
};

export default Index;
