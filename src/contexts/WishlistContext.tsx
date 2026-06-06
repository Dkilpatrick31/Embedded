"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
}

interface WishlistContextValue {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: WishlistItem) => void;
  isWishlisted: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  toggleItem: () => {},
  isWishlisted: () => false,
});

const STORAGE_KEY = "embedded-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore malformed storage
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, mounted]);

  const addItem = (item: WishlistItem) => {
    setItems((prev) =>
      prev.some((i) => i.id === item.id) ? prev : [...prev, item]
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleItem = (item: WishlistItem) => {
    setItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const isWishlisted = (id: string) => items.some((i) => i.id === id);

  if (!mounted) return null;

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, toggleItem, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
