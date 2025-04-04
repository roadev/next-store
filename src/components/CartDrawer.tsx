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

  const subtotal = items
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        Cart ({items.length})
      </button>

      {isOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto border-l">
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
                  <li key={item.id} className="flex items-center gap-3">
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
                <p className="text-sm font-medium">Subtotal: ${subtotal}</p>
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
