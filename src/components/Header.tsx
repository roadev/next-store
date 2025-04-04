"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { usePathname } from "next/navigation";

export function Header() {
  const user = useAuthStore((s) => s.user);
  const pathname = usePathname();

  return (
    <header className="bg-white border-b px-6 py-4 shadow-sm flex items-center justify-between sticky top-0 z-40">
      <Link href="/products" className="text-lg font-bold tracking-tight">
        Store
      </Link>

      <nav className="flex items-center gap-6 text-sm font-medium">
        <Link
          href="/products"
          className={`hover:underline ${pathname === "/products" ? "text-blue-600 font-semibold" : ""}`}
        >
          Catalog
        </Link>

        <Link
          href="/favorites"
          className={`hover:underline ${pathname === "/favorites" ? "text-blue-600 font-semibold" : ""}`}
        >
          Favorites
        </Link>

        {user ? (
          <Link
            href="/account"
            className={`hover:underline ${pathname === "/account" ? "text-blue-600 font-semibold" : ""}`}
          >
            My Account
          </Link>
        ) : (
          <Link
            href="/login"
            className={`hover:underline ${pathname === "/login" ? "text-blue-600 font-semibold" : ""}`}
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
