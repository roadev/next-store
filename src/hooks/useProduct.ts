import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { Product } from "@/types/product";

export const useProduct = (id: string | undefined) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetcher<Product>(`https://fakestoreapi.com/products/${id}`),
    enabled: !!id,
  });
};
