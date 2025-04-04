"use client";

import { useProducts } from "@/hooks/useProducts";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { useFavoritesStore } from "@/store/favorites";
import { useState } from "react";

export default function ProductsPage() {
  const { data, isLoading, isError } = useProducts();
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const [_, setRefresh] = useState(false);

  const queryClient = useQueryClient();

  if (isLoading)
    return <p className="text-center mt-10">Loading products...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error loading products.</p>
    );
  if (!data || data.length === 0)
    return <p className="text-center mt-10">No products found.</p>;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product: Product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            onMouseEnter={() =>
              queryClient.prefetchQuery({
                queryKey: ["product", String(product.id)],
                queryFn: () =>
                  fetcher<Product>(
                    `https://fakestoreapi.com/products/${product.id}`,
                  ),
              })
            }
            className="cursor-pointer"
          >
            <div className="border rounded-lg p-4 hover:shadow-md transition h-full flex flex-col">
              <img
                src={product.image}
                alt={product.title}
                className="h-40 w-full object-contain mb-4"
              />
              <h2 className="font-semibold line-clamp-2">{product.title}</h2>
              <p className="mt-auto font-bold">${product.price}</p>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                  });
                  setRefresh((r) => !r);
                }}
                className="mt-2 text-sm text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span
                  className={`transition ${
                    isFavorite(product.id)
                      ? "text-blue-600 animate-pulse"
                      : "text-gray-400"
                  }`}
                >
                  {isFavorite(product.id) ? "♥" : "♡"}
                </span>
                <span>
                  {isFavorite(product.id)
                    ? "Remove Favorite"
                    : "Add to Favorites"}
                </span>
              </button>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
