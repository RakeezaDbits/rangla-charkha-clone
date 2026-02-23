import { Heart, ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
    in_stock: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleAction = (action: () => void) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    action();
  };

  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group bg-card border border-border rounded-sm overflow-hidden transition-all duration-300 hover:border-primary/40">
      <div className="aspect-[3/4] overflow-hidden relative">
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <button
          onClick={() => handleAction(() => toggleWishlist.mutate(product.id))}
          className="absolute top-3 right-3 p-2 bg-background/70 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>
        {!product.in_stock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="font-display text-sm text-foreground">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-display text-sm text-foreground">{product.name}</h3>
        <p className="font-body text-sm text-primary">Rs. {product.price.toLocaleString()}</p>
        <button
          onClick={() => handleAction(() => addToCart.mutate({ productId: product.id }))}
          disabled={!product.in_stock}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-primary/40 text-primary hover:border-primary hover:bg-primary/5 font-body text-xs tracking-widest uppercase transition-all duration-300 disabled:opacity-50"
        >
          <ShoppingCart className="w-3 h-3" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
