"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { orders } from "@/constants/data/orders";

export default function AccountPage() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user}</h1>
      <p className="text-sm text-gray-600">This is your account dashboard.</p>
      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Order History</h2>
        <ul className="space-y-4 text-sm">
          {orders.map((order) => (
            <li
              key={order.id}
              className="p-4 border rounded-lg bg-white dark:bg-zinc-800 shadow-sm"
            >
              <div className="flex justify-between">
                <span className="font-medium">{order.id}</span>
                <span>{order.date}</span>
              </div>
              <div className="mt-2 text-gray-600 dark:text-gray-300">
                {order.items} item{order.items > 1 ? "s" : ""} – Total: $
                {order.total.toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
