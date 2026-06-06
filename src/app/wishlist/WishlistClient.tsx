"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/app/shop/ProductCard";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/lib/products";

export default function WishlistClient() {
  const { items } = useWishlist();

  const wishlistProducts = items
    .map((item) => products.find((p) => p.id === item.id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pt-16">
        <div
          className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-8 md:py-12"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h1
            className="text-4xl md:text-5xl font-bold uppercase leading-none"
            style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
          >
            Wishlist
          </h1>
          <p className="mt-2 text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}>
            {wishlistProducts.length === 0
              ? "No saved items"
              : `${wishlistProducts.length} ${wishlistProducts.length === 1 ? "item" : "items"}`}
          </p>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-10 md:py-14">
          <AnimatePresence mode="wait">
            {wishlistProducts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-28 gap-6"
              >
                <svg
                  width="48" height="48" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1"
                  className="opacity-20"
                  style={{ color: "var(--text)" }}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <div className="text-center">
                  <p
                    className="text-xs tracking-[0.3em] uppercase mb-2 opacity-40"
                    style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
                  >
                    Your Wishlist Is Empty
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}>
                    Save items you love and find them here later.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="inline-block px-8 py-3.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "var(--accent)", color: "var(--bg)", fontFamily: "var(--font-rajdhani)", fontWeight: 700, letterSpacing: "0.2em" }}
                >
                  Shop Now
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10"
              >
                {wishlistProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
