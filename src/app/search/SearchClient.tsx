"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/app/shop/ProductCard";
import { products, COLLECTIONS } from "@/lib/products";

// ── Helpers ───────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "Men",         href: "/shop?category=Men" },
  { label: "Women",       href: "/shop?category=Women" },
  { label: "Gear",        href: "/shop?category=Gear" },
  { label: "Collections", href: "/shop" },
];

function filterProducts(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter((p) => {
    const collectionLabel =
      COLLECTIONS.find((c) => c.id === p.collection)?.label ?? p.collection;
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q) ||
      collectionLabel.toLowerCase().includes(q)
    );
  });
}

// ── Quick-link chip ───────────────────────────────────────────────────────────

function QuickLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="px-6 py-3 text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
      style={{
        border: "1px solid var(--border)",
        color: "var(--text)",
        fontFamily: "var(--font-rajdhani)",
        fontWeight: 700,
        letterSpacing: "0.15em",
      }}
    >
      {label}
    </Link>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [inputValue, setInputValue] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      setInputValue(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const qs = value.trim() ? `?q=${encodeURIComponent(value.trim())}` : "";
        router.replace(`/search${qs}`, { scroll: false });
      }, 300);
    },
    [router]
  );

  const query = inputValue.trim();
  const hasQuery = query.length > 0;
  const results = hasQuery ? filterProducts(query) : [];

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pt-16">
        {/* ── Search header ── */}
        <div
          className="py-14 md:py-20"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="max-w-2xl mx-auto px-6">
            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="SEARCH EMBEDDED"
              autoComplete="off"
              spellCheck={false}
              className="w-full bg-transparent outline-none text-2xl sm:text-3xl md:text-4xl uppercase text-center pb-3 placeholder:opacity-25"
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 700,
                color: "var(--text)",
                letterSpacing: "0.12em",
                borderBottom: "2px solid var(--accent)",
                caretColor: "var(--accent)",
              }}
            />

            {/* Status line */}
            <AnimatePresence mode="wait">
              <motion.p
                key={hasQuery ? query : "__empty"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="mt-5 text-center text-[11px] tracking-[0.3em] uppercase"
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 600,
                }}
              >
                {!hasQuery
                  ? "What are you looking for?"
                  : results.length > 0
                  ? `${results.length} result${results.length === 1 ? "" : "s"} for '${query}'`
                  : `No results for '${query}'`}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-14">
          <AnimatePresence mode="wait">
            {/* Pre-query: WHAT ARE YOU LOOKING FOR + category quick links */}
            {!hasQuery && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center gap-10"
              >
                <div>
                  <p
                    className="text-center text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-none"
                    style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)", opacity: 0.06 }}
                  >
                    Embedded
                  </p>
                </div>

                <div className="text-center">
                  <p
                    className="text-xs tracking-[0.25em] uppercase mb-6 opacity-50"
                    style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
                  >
                    Browse by category
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {QUICK_LINKS.map((link) => (
                      <QuickLink key={link.label} {...link} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* No results */}
            {hasQuery && results.length === 0 && (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center gap-8"
              >
                <p
                  className="text-xs text-center max-w-xs"
                  style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
                >
                  Try a different term, or browse by category below.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {QUICK_LINKS.map((link) => (
                    <QuickLink key={link.label} {...link} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Results grid */}
            {hasQuery && results.length > 0 && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10"
              >
                {results.map((product) => (
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
