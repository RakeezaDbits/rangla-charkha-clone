import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const useWishlist = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: async () => {
      if (!user) return [];
      return api.get("/api/wishlist");
    },
    enabled: !!user,
  });

  const toggleWishlist = useMutation({
    mutationFn: async (productId: string) => {
      if (!user) throw new Error("Login required");
      const existing = wishlistItems.find((i: any) => i.product_id === productId);
      if (existing) {
        await api.delete(`/api/wishlist/${productId}`);
        return { added: false };
      }
      await api.post("/api/wishlist/toggle", { product_id: productId });
      return { added: true };
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
