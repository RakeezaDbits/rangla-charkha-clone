import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const url = category ? `/api/products?category=${encodeURIComponent(category)}` : "/api/products";
      return api.get(url);
    },
  });
};
