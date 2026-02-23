import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";

const CasualWear = () => {
  const { data: products = [], isLoading } = useProducts("casual");

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-4xl text-foreground text-center mb-4">Casual Wear</h1>
        <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Modern casual outfits for everyday elegance. Comfortable, stylish, and perfect for women aged 18–45.
        </p>
        {isLoading ? (
          <p className="text-center text-muted-foreground font-body">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground font-body">No products available yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default CasualWear;
