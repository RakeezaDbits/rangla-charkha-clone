import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/hooks/useWishlist";
import ProductCard from "@/components/ProductCard";
import GoldButton from "@/components/GoldButton";

const Wishlist = () => {
  const { user } = useAuth();
  const { wishlistItems } = useWishlist();

  if (!user) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center py-16 gap-4">
        <h1 className="font-display text-3xl text-foreground">Your Wishlist</h1>
        <p className="font-body text-muted-foreground">Please login to view your wishlist.</p>
        <GoldButton to="/auth">Sign In</GoldButton>
      </main>
    );
  }

  if (wishlistItems.length === 0) {
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
          {wishlistItems.map((item: any) => (
            <ProductCard key={item.id} product={item.products} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Wishlist;
