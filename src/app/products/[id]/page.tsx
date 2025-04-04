"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useProduct } from "@/hooks/useProduct";
import { useCartStore } from "@/store/cart";
import { useRelatedProducts } from "@/hooks/useRelatedProducts";
import { useFavoritesStore } from "@/store/favorites";
import { useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, isError } = useProduct(id);
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  const [_, setRefresh] = useState(false);
  const productId = parseInt(id);

  const { data: relatedProducts, isLoading: loadingRelated } =
    useRelatedProducts(data?.category || "", productId);

  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);

  if (isLoading) return <p className="mt-10 text-center">Loading product...</p>;
  if (isError || !data) return notFound();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={data.image}
          alt={data.title}
          className="h-80 object-contain"
        />
        <div>
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <p className="text-gray-500 mt-2">{data.category}</p>
          <p className="mt-4 text-xl font-semibold">${data.price}</p>
          <p className="mt-4 text-sm text-gray-700">{data.description}</p>

          <button
            onClick={() => {
              addItem({
                id: data.id,
                title: data.title,
                price: data.price,
                image: data.image,
              });
              setAdded(true);
              setTimeout(() => setAdded(false), 1500);
            }}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:scale-95 transition duration-150 ease-in-out cursor-pointer"
          >
            {added ? "Added!" : "Add to Cart"}
          </button>

          <button
            onClick={() => {
              toggleFavorite({
                id: data.id,
                title: data.title,
                price: data.price,
                image: data.image,
              });
              setRefresh((r) => !r);
            }}
            className="mt-3 text-sm text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
          >
            <span
              className={`transition ${
                isFavorite(data.id)
                  ? "text-blue-600 animate-pulse"
                  : "text-gray-400"
              }`}
            >
              {isFavorite(data.id) ? "♥" : "♡"}
            </span>
            <span>
              {isFavorite(data.id) ? "Remove Favorite" : "Add to Favorites"}
            </span>
          </button>
        </div>
      </div>

      {relatedProducts && relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.id}`}
                className="border rounded-lg p-4 hover:shadow transition cursor-pointer"
              >
                <img
                  src={rel.image}
                  alt={rel.title}
                  className="h-32 w-full object-contain mb-2"
                />
                <h3 className="text-sm font-semibold line-clamp-2">
                  {rel.title}
                </h3>
                <p className="text-sm mt-1 font-bold">${rel.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
