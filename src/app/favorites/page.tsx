"use client";

import { useFavoritesStore } from "@/store/favorites";
import Link from "next/link";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites);

  return (
    <main className="max-w-screen-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">You have no favorite products.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="border rounded-lg p-4 hover:shadow transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-contain mb-2"
              />
              <h3 className="text-sm font-semibold line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm font-bold mt-1">${item.price}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
