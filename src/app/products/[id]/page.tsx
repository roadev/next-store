"use client";

import { useProduct } from "@/hooks/useProduct";
import { notFound, useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, isError } = useProduct(id);

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

          <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:opacity-90 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
