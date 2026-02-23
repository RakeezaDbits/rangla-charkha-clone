import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useWishlist = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("wishlist_items")
        .select("*, products(*)")
        .eq("user_id", user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const toggleWishlist = useMutation({
    mutationFn: async (productId: string) => {
      if (!user) throw new Error("Login required");
      const existing = wishlistItems.find((i: any) => i.product_id === productId);
      if (existing) {
        const { error } = await supabase.from("wishlist_items").delete().eq("id", existing.id);
        if (error) throw error;
        return { added: false };
      } else {
        const { error } = await supabase.from("wishlist_items").insert({ user_id: user.id, product_id: productId });
        if (error) throw error;
        return { added: true };
      }
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success(data?.added ? "Added to wishlist!" : "Removed from wishlist");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const isInWishlist = (productId: string) => wishlistItems.some((i: any) => i.product_id === productId);

  return { wishlistItems, isLoading, toggleWishlist, isInWishlist, wishlistCount: wishlistItems.length };
};
