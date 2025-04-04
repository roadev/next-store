"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";

export function Header() {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="bg-white border-b px-6 py-4 shadow-sm flex items-center justify-between sticky top-0 z-40">
      <Link href="/products" className="text-lg font-bold tracking-tight">
        Store
      </Link>

      <nav className="flex items-center gap-6 text-sm font-medium">
        <Link href="/products" className="hover:underline">
          Catalog
        </Link>

        {user ? (
          <Link href="/account" className="hover:underline">
            My Account
          </Link>
        ) : (
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
