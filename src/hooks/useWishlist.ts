import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

const GUEST_WISHLIST_KEY = "guest_wishlist";

function getGuestWishlist(): string[] {
  try {
    return JSON.parse(localStorage.getItem(GUEST_WISHLIST_KEY) || "[]");
  } catch {
    return [];
  }
}

export const useWishlist = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: wishlistIds = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.id ?? "guest"],
    queryFn: async () => {
      if (!user) return getGuestWishlist();
      const list = await api.get("/api/wishlist");
      return (list || []).map((i: any) => i.product_id);
    },
    enabled: true,
  });

  const wishlistItems = (wishlistIds as string[]).map((product_id) => ({ product_id }));

  const toggleWishlist = useMutation({
    mutationFn: async (productId: string) => {
      if (!user) {
        const list = getGuestWishlist();
        const idx = list.indexOf(productId);
        if (idx >= 0) {
          list.splice(idx, 1);
          localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(list));
          return { added: false };
        }
        list.push(productId);
        localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(list));
        return { added: true };
      }
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

  const isInWishlist = (productId: string) => (wishlistIds as string[]).includes(productId);

  return { wishlistItems, isLoading, toggleWishlist, isInWishlist, wishlistCount: (wishlistIds as string[]).length };
};
