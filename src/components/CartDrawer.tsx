"use client";

import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const rawSubtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = +(rawSubtotal * 0.15).toFixed(2);
  const total = +(rawSubtotal + tax).toFixed(2);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        🛒 Cart ({items.length})
      </button>

      {isOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-zinc-900 text-black dark:text-white shadow-lg z-50 p-6 overflow-y-auto border-l border-gray-200 dark:border-zinc-700 transition-transform">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 border-b pb-3"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-contain"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                          className="w-16 border rounded px-2 py-1 text-sm"
                        />
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t pt-4">
                <div className="text-sm space-y-1">
                  <p>Subtotal: ${rawSubtotal.toFixed(2)}</p>
                  <p>Tax (15%): ${tax.toFixed(2)}</p>
                  <p className="font-semibold">Total: ${total.toFixed(2)}</p>
                </div>
                <button
                  onClick={clearCart}
                  className="mt-3 w-full text-sm text-red-600 hover:underline"
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
