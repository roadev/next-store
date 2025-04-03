import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetcher(`https://fakestoreapi.com/products/${id}`),
    enabled: !!id,
  });
};
