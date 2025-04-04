"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { CartDrawer } from "@/components/CartDrawer";
import { Header } from "@/components/Header";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Header />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <CartDrawer />
      </body>
    </html>
  );
}
