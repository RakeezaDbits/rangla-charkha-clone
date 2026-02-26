import { useQuery } from "@tanstack/react-query";
import { useWishlist } from "@/hooks/useWishlist";
import ProductCard from "@/components/ProductCard";
import GoldButton from "@/components/GoldButton";
import { api } from "@/lib/api";

const Wishlist = () => {
  const { wishlistItems, wishlistCount } = useWishlist();
  const ids = wishlistItems.map((i: any) => i.product_id).filter(Boolean);

  const { data: products = [] } = useQuery({
    queryKey: ["products-for-wishlist", ids],
    queryFn: async () => {
      if (ids.length === 0) return [];
      const all = await api.get("/api/products");
      return (all || []).filter((p: any) => ids.includes(p.id));
    },
    enabled: ids.length > 0,
  });

  if (wishlistCount === 0) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center py-16 gap-4">
        <h1 className="font-display text-3xl text-foreground">Your Wishlist is Empty</h1>
        <p className="font-body text-muted-foreground">Save your favorite items here.</p>
        <GoldButton to="/lawn-collection">Browse Collection</GoldButton>
      </main>
    );
  }

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl text-foreground text-center mb-8">Your Wishlist</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={{ ...product, in_stock: product.in_stock !== false }} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Wishlist;
