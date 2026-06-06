"use client";

import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { type Product } from "@/lib/products";

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5"
      fill={filled ? "currentColor" : "none"} stroke="currentColor">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const [hovered, setHovered] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: product.id, name: product.name, price: product.price, size: product.sizes[0] });
  }, [addItem, product]);

  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({ id: product.id, name: product.name, slug: product.slug, price: product.price, category: product.category });
  }, [toggleItem, product]);

  const collectionLabel = useMemo(() =>
    product.collection
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" "),
  [product.collection]);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Link href={`/shop/${product.slug}`} className="block">
        {/* Image area */}
        <div
          className="relative overflow-hidden mb-3"
          style={{
            aspectRatio: "3/4",
            backgroundColor: "var(--surface)",
            border: `1px solid ${hovered ? "var(--accent)" : "transparent"}`,
            transition: "border-color 0.3s ease",
          }}
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, rgba(200,169,110,0.06) 0%, transparent 70%)" }}
          />

          {/* Name watermark */}
          <div
            className="absolute inset-0 flex items-center justify-center px-4 opacity-[0.07] pointer-events-none"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            <span className="text-3xl font-bold uppercase tracking-widest text-center leading-tight" style={{ color: "var(--text)" }}>
              {product.name}
            </span>
          </div>

          {/* Tag */}
          {product.tag && (
            <div
              className="absolute top-3 left-3 z-10 px-2.5 py-0.5 text-[10px] tracking-widest uppercase"
              style={{ backgroundColor: "var(--accent)", color: "var(--bg)", fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
            >
              {product.tag}
            </div>
          )}

          {/* Heart / wishlist toggle */}
          <motion.button
            onClick={handleWishlist}
            whileTap={{ scale: 0.75 }}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center cursor-pointer"
            style={{
              color: wishlisted ? "var(--accent)" : "var(--text)",
              opacity: hovered || wishlisted ? 1 : 0,
              transition: "opacity 0.2s ease, color 0.2s ease",
            }}
          >
            <HeartIcon filled={wishlisted} />
          </motion.button>

          {/* Quick Add — slides up on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 transition-transform duration-300"
            style={{ transform: hovered ? "translateY(0)" : "translateY(100%)" }}
          >
            <button
              onClick={handleQuickAdd}
              className="w-full py-3 text-[11px] tracking-widest uppercase cursor-pointer transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "var(--bg)",
                color: "var(--text)",
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 700,
                letterSpacing: "0.2em",
                border: "none",
              }}
            >
              Quick Add — {product.sizes[0]}
            </button>
          </div>
        </div>

        {/* Caption */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3
              className="text-sm font-semibold uppercase tracking-wide leading-snug truncate"
              style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
            >
              {product.name}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}>
              {product.category} · {collectionLabel}
            </p>
          </div>
          <span className="text-sm flex-shrink-0" style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}>
            ${product.price}
          </span>
        </div>
      </Link>
    </div>
  );
}
