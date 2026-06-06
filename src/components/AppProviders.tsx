"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { CartDrawerProvider } from "@/contexts/CartDrawerContext";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <CartDrawerProvider>
            {children}
          </CartDrawerProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
