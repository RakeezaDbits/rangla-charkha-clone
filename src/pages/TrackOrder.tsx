import { useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "@/lib/api";
import GoldButton from "@/components/GoldButton";
import { Package, MapPin, Phone, Truck } from "lucide-react";

const statusSteps = ["pending", "processing", "delivered"];
const statusLabels: Record<string, string> = {
  pending: "Order Placed",
  processing: "Processing / Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const TrackOrder = () => {
  const location = useLocation();
  const state = (location.state as { orderId?: string; phone?: string }) || {};
  const [orderId, setOrderId] = useState(state.orderId || "");
  const [phone, setPhone] = useState(state.phone || "");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOrder(null);
    if (!orderId.trim() || !phone.trim()) {
      setError("Order ID and phone number are required.");
      return;
    }
    setLoading(true);
    try {
      const data = await api.get(
        `/api/orders/track?order_id=${encodeURIComponent(orderId.trim())}&phone=${encodeURIComponent(phone.trim())}`
      );
      setOrder(data);
    } catch (e: any) {
      setError(e.message || "Order not found or phone does not match.");
    }
    setLoading(false);
  };

  const inputClass =
    "w-full bg-card border border-border p-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 rounded-sm";

  return (
    <main className="py-16">
      <div className="container mx-auto px-4 max-w-lg">
        <h1 className="font-display text-3xl text-foreground text-center mb-2">Track Your Order</h1>
        <p className="font-body text-muted-foreground text-center mb-8">
          Enter your order ID and phone number to see status.
        </p>

        <form onSubmit={handleTrack} className="space-y-4 mb-8">
          <input
            placeholder="Order ID (e.g. from confirmation)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className={inputClass}
          />
          <input
            placeholder="Phone number (e.g. 03209417086)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
          {error && <p className="font-body text-sm text-destructive">{error}</p>}
          <GoldButton type="submit" className="w-full text-center" disabled={loading}>
            {loading ? "Searching..." : "Track Order"}
          </GoldButton>
        </form>

        {order && (
          <div className="bg-card border border-border rounded-sm p-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm text-muted-foreground">Order #{order.id?.slice(0, 8)}</span>
              <span
                className={`px-3 py-1 rounded-sm font-body text-xs uppercase ${
                  order.status === "pending"
                    ? "bg-primary/10 text-primary"
                    : order.status === "processing"
                      ? "bg-blue-500/10 text-blue-400"
                      : order.status === "delivered"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-destructive/10 text-destructive"
                }`}
              >
                {statusLabels[order.status] || order.status}
              </span>
            </div>

            {order.tracking_number && (
              <div className="flex items-center gap-2 font-body text-sm">
                <Truck className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Tracking:</span>
                <span className="text-foreground font-medium">{order.tracking_number}</span>
              </div>
            )}

            {order.status !== "cancelled" && (
              <div className="flex justify-between items-center">
                {statusSteps.map((s, i) => (
                  <div key={s} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        statusSteps.indexOf(order.status) >= i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {statusSteps.indexOf(order.status) > i ? "✓" : i + 1}
                    </div>
                    <span className="font-body text-[10px] mt-1 text-muted-foreground">{statusLabels[s]}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2 font-body text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                {order.shipping_name}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {order.shipping_phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {order.shipping_address}, {order.shipping_city}
              </p>
            </div>

            <div className="border-t border-border pt-4 space-y-1">
              {order.order_items?.map((item: any) => (
                <p key={item.id} className="font-body text-sm text-foreground">
                  {item.product_name} × {item.quantity} {item.size && `(${item.size})`} — Rs.{" "}
                  {(item.price * item.quantity).toLocaleString()}
                </p>
              ))}
            </div>
            <p className="font-display text-lg text-primary pt-2">Total: Rs. {Number(order.total).toLocaleString()}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default TrackOrder;
