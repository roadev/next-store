import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetcher("https://fakestoreapi.com/products"),
  });
};
