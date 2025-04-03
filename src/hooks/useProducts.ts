import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { Product } from "@/types/product";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetcher<Product[]>("https://fakestoreapi.com/products"),
  });
};
