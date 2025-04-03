"use client";

import { useProducts } from "@/hooks/useProducts";

export default function ProductosPage() {
  const { data, isLoading, isError } = useProducts();

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
        {data.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-contain mb-4"
            />
            <h2 className="font-semibold line-clamp-2">{product.title}</h2>
            <p className="mt-2 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
