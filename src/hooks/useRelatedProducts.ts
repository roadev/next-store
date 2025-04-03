import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { Product } from "@/types/product";

export const useRelatedProducts = (category: string, excludeId: number) => {
  return useQuery<Product[]>({
    queryKey: ["related-products", category],
    queryFn: () =>
      fetcher<Product[]>(
        `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`,
      ),
    select: (data) => data.filter((p) => p.id !== excludeId),
    enabled: !!category,
  });
};
