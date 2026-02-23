import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";

const LawnCollection = () => {
  const { data: products = [], isLoading } = useProducts("lawn");

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-4xl text-foreground text-center mb-4">Latest Lawn Collection</h1>
        <p className="font-body text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Upgrade your summer wardrobe with our premium lawn collection. Designed with breathable fabric and elegant cuts, perfect for casual gatherings and everyday wear.
        </p>
        {isLoading ? (
          <p className="text-center text-muted-foreground font-body">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground font-body">No products available yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default LawnCollection;
