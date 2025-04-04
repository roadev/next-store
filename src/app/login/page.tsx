"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const router = useRouter();
  const [username, setUsername] = useState("");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border px-4 py-2 rounded w-full max-w-sm mb-4"
      />
      <button
        onClick={() => {
          login(username);
          router.push("/account");
        }}
        disabled={!username.trim()}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Sign in
      </button>
    </main>
  );
}
