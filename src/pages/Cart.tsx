import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { Minus, Plus, Trash2 } from "lucide-react";
import GoldButton from "@/components/GoldButton";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (!user) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center py-16 gap-4">
        <h1 className="font-display text-3xl text-foreground">Your Cart</h1>
        <p className="font-body text-muted-foreground">Please login to view your cart.</p>
        <GoldButton to="/auth">Sign In</GoldButton>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center py-16 gap-4">
        <h1 className="font-display text-3xl text-foreground">Your Cart is Empty</h1>
        <p className="font-body text-muted-foreground">Browse our collections and add items.</p>
        <GoldButton to="/lawn-collection">Shop Now</GoldButton>
      </main>
    );
  }

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl text-foreground text-center mb-8">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item: any) => (
              <div key={item.id} className="flex gap-4 bg-card border border-border rounded-sm p-4">
                <img
                  src={item.products?.image_url || "/placeholder.svg"}
                  alt={item.products?.name}
                  className="w-20 h-24 object-cover rounded-sm"
                />
                <div className="flex-1 space-y-1">
                  <h3 className="font-display text-sm text-foreground">{item.products?.name}</h3>
                  <p className="font-body text-xs text-muted-foreground">Size: {item.size}</p>
                  <p className="font-body text-sm text-primary">Rs. {item.products?.price?.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity.mutate({ itemId: item.id, quantity: Math.max(1, item.quantity - 1) })}
                      className="p-1 border border-border rounded-sm hover:border-primary/40"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-body text-sm w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity.mutate({ itemId: item.id, quantity: item.quantity + 1 })}
                      className="p-1 border border-border rounded-sm hover:border-primary/40"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart.mutate(item.id)}
                      className="ml-auto p-1 text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-sm p-6 h-fit space-y-4">
            <h2 className="font-display text-lg text-foreground">Order Summary</h2>
            <div className="flex justify-between font-body text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-body text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-primary">Free</span>
            </div>
            <div className="section-divider" />
            <div className="flex justify-between font-display text-lg">
              <span>Total</span>
              <span className="text-primary">Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <GoldButton onClick={() => navigate("/checkout")} className="w-full text-center">
              Proceed to Checkout
            </GoldButton>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
