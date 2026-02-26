import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "@/hooks/useCart";
import GoldButton from "@/components/GoldButton";
import { api } from "@/lib/api";
import { toast } from "sonner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY || "");

const CheckoutForm = ({
  orderId,
  shippingPhone,
}: {
  orderId: string;
  shippingPhone: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setPaying(true);
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout-success?orderId=${orderId}&phone=${encodeURIComponent(shippingPhone)}`,
          payment_method_data: { billing_details: {} },
        },
      });
      if (error) {
        toast.error(error.message || "Payment failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Payment failed");
    }
    setPaying(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <GoldButton type="submit" className="w-full text-center" disabled={!stripe || paying}>
        {paying ? "Processing..." : "Pay now"}
      </GoldButton>
    </form>
  );
};

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "" });
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState("");

  if (cartItems.length === 0 && !clientSecret) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center py-16 gap-4">
        <h1 className="font-display text-3xl text-foreground">Checkout</h1>
        <p className="font-body text-muted-foreground">Your cart is empty.</p>
        <GoldButton to="/cart">Back to Cart</GoldButton>
      </main>
    );
  }

  const inputClass =
    "w-full bg-card border border-border p-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 rounded-sm";

  const handleProceedToPayment = async () => {
    try {
      const items = cartItems.map((item: any) => ({
        product_id: item.product_id,
        product_name: item.products?.name || item.product_name || "Product",
        price: item.products?.price ?? item.product_price ?? 0,
        quantity: item.quantity,
        size: item.size,
      }));
      const res = await api.post("/api/checkout/create-payment-intent", {
        total: cartTotal,
        shipping_name: form.name,
        shipping_phone: form.phone,
        shipping_address: form.address,
        shipping_city: form.city,
        items,
      });
      setClientSecret(res.clientSecret);
      setOrderId(res.orderId);
      setStep("payment");
    } catch (err: any) {
      toast.error(err.message || "Failed to create payment");
    }
  };

  return (
    <main className="py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="font-display text-3xl text-foreground text-center mb-8">Checkout</h1>

        {step === "shipping" && (
          <>
            <div className="bg-card border border-border rounded-sm p-6 mb-6">
              <h2 className="font-display text-lg text-foreground mb-4">Order summary</h2>
              {cartItems.map((item: any) => (
                <div key={item.id} className="flex justify-between font-body text-sm py-1">
                  <span className="text-foreground">
                    {item.products?.name || item.product_name} × {item.quantity}
                  </span>
                  <span className="text-primary">
                    Rs. {((item.products?.price ?? item.product_price ?? 0) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="section-divider my-4" />
              <div className="flex justify-between font-display text-lg">
                <span>Total</span>
                <span className="text-primary">Rs. {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-sm p-6 space-y-4">
              <h2 className="font-display text-lg text-foreground">Shipping details</h2>
              <input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                required
                className={inputClass}
              />
              <input
                placeholder="Phone (e.g. 03209417086)"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                required
                className={inputClass}
              />
              <input
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                required
                className={inputClass}
              />
              <input
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                required
                className={inputClass}
              />
              <GoldButton type="button" onClick={handleProceedToPayment} className="w-full text-center">
                Proceed to payment
              </GoldButton>
            </div>
          </>
        )}

        {step === "payment" && clientSecret && (
          <div className="bg-card border border-border rounded-sm p-6">
            <h2 className="font-display text-lg text-foreground mb-4">Payment</h2>
            <p className="font-body text-sm text-muted-foreground mb-4">Pay Rs. {cartTotal.toLocaleString()}</p>
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "night",
                  variables: { colorPrimary: "#D4AF37" },
                },
              }}
            >
              <CheckoutForm orderId={orderId} shippingPhone={form.phone} />
            </Elements>
          </div>
        )}
      </div>
    </main>
  );
};

export default Checkout;
