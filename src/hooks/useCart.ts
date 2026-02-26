import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

const GUEST_CART_KEY = "guest_cart";

function getGuestCart(): any[] {
  try {
    return JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function setGuestCart(items: any[]) {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
}

export const useCart = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart", user?.id ?? "guest"],
    queryFn: async () => {
      if (!user) return getGuestCart();
      return api.get("/api/cart");
    },
    enabled: true,
  });

  const addToCart = useMutation({
    mutationFn: async ({ productId, size = "M", product }: { productId: string; size?: string; product?: { name?: string; price?: number; image_url?: string | null } }) => {
      if (!user) {
        const cart = getGuestCart();
        const key = `${productId}-${size}`;
        const existing = cart.find((i: any) => (i.product_id === productId && i.size === size) || i.id === key);
        if (existing) {
          existing.quantity = (existing.quantity || 1) + 1;
        } else {
          cart.push({
            id: key,
            product_id: productId,
            quantity: 1,
            size,
            product_name: product?.name ?? "Product",
            product_price: product?.price ?? 0,
            product_image_url: product?.image_url ?? null,
            products: { name: product?.name, price: product?.price, image_url: product?.image_url },
          });
        }
        setGuestCart(cart);
        return;
      }
      await api.post("/api/cart", { product_id: productId, size, quantity: 1 });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Added to cart!");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const removeFromCart = useMutation({
    mutationFn: async (itemId: string) => {
      if (!user) {
        const cart = getGuestCart().filter((i: any) => i.id !== itemId);
        setGuestCart(cart);
        return;
      }
      await api.delete(`/api/cart/${itemId}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      if (!user) {
        const cart = getGuestCart();
        const item = cart.find((i: any) => i.id === itemId);
        if (item) item.quantity = Math.max(1, quantity);
        setGuestCart(cart);
        return;
      }
      await api.patch(`/api/cart/${itemId}`, { quantity });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });

  const clearCart = useMutation({
    mutationFn: async () => {
      if (!user) {
        setGuestCart([]);
        return;
      }
      await api.delete("/api/cart/clear");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });

  const cartCount = cartItems.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
  const cartTotal = cartItems.reduce(
    (sum: number, item: any) => sum + (item.products?.price ?? item.products?.product_price ?? item.product_price ?? 0) * (item.quantity || 1),
    0
  );

  return { cartItems, isLoading, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal };
};
