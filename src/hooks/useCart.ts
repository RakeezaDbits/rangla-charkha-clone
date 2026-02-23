import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const useCart = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: async () => {
      if (!user) return [];
      return api.get("/api/cart");
    },
    enabled: !!user,
  });

  const addToCart = useMutation({
    mutationFn: async ({ productId, size = "M" }: { productId: string; size?: string }) => {
      if (!user) throw new Error("Login required");
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
      await api.delete(`/api/cart/${itemId}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      await api.patch(`/api/cart/${itemId}`, { quantity });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });

  const clearCart = useMutation({
    mutationFn: async () => {
      if (!user) return;
      await api.delete("/api/cart/clear");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });

  const cartCount = cartItems.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
  const cartTotal = cartItems.reduce(
    (sum: number, item: any) => sum + (item.products?.price ?? item.products?.product_price ?? 0) * (item.quantity || 1),
    0
  );

  return { cartItems, isLoading, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal };
};
