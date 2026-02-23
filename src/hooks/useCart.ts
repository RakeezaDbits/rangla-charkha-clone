import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useCart = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("cart_items")
        .select("*, products(*)")
        .eq("user_id", user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const addToCart = useMutation({
    mutationFn: async ({ productId, size = "M" }: { productId: string; size?: string }) => {
      if (!user) throw new Error("Login required");
      const { error } = await supabase
        .from("cart_items")
        .insert({ user_id: user.id, product_id: productId, size, quantity: 1 });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Added to cart!");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const removeFromCart = useMutation({
    mutationFn: async (itemId: string) => {
      const { error } = await supabase.from("cart_items").delete().eq("id", itemId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", itemId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });

  const clearCart = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const { error } = await supabase.from("cart_items").delete().eq("user_id", user.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });

  const cartCount = cartItems.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
  const cartTotal = cartItems.reduce((sum: number, item: any) => sum + (item.products?.price || 0) * (item.quantity || 1), 0);

  return { cartItems, isLoading, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal };
};
