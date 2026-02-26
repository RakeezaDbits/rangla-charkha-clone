import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { useCart } from "@/hooks/useCart";
import GoldButton from "@/components/GoldButton";

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const phone = searchParams.get("phone");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const { clearCart } = useCart();

  useEffect(() => {
    if (!orderId) {
      setError("Invalid return");
      return;
    }
    (async () => {
      try {
        await api.post(`/api/orders/${orderId}/confirm-payment`, phone ? { phone } : {});
        await clearCart.mutateAsync();
        setDone(true);
      } catch (e: any) {
        setError(e.message || "Could not confirm order");
      }
    })();
  }, [orderId, phone]);

  if (error) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center py-16 gap-4">
        <h1 className="font-display text-2xl text-foreground">Something went wrong</h1>
        <p className="font-body text-muted-foreground">{error}</p>
        <GoldButton to="/cart">Back to Cart</GoldButton>
      </main>
    );
  }

  if (!done) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center py-16">
        <p className="font-body text-muted-foreground">Confirming your order...</p>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center py-16 gap-6">
      <h1 className="font-display text-3xl text-foreground">Thank you for your order!</h1>
      <p className="font-body text-muted-foreground text-center">
        Payment was successful. You can track your order below.
      </p>
      <Link to="/track-order" state={{ orderId, phone }}>
        <GoldButton>Track Order</GoldButton>
      </Link>
      <Link to="/" className="font-body text-sm text-primary hover:underline">
        Continue shopping
      </Link>
    </main>
  );
};

export default CheckoutSuccess;
