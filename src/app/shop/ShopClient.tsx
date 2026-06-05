"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import FilterPanel from "./FilterPanel";
import ProductCard from "./ProductCard";
import { products, SORT_OPTIONS, PRICE_RANGES } from "@/lib/products";

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
    </svg>
  );
}

export default function ShopClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sheetOpen, setSheetOpen] = useState(false);

  // ── Parse URL params ──────────────────────────────────────────────────────
  const selectedCategories = useMemo(
    () => searchParams.get("category")?.split(",").filter(Boolean) ?? [],
    [searchParams]
  );
  const selectedCollections = useMemo(
    () => searchParams.get("collection")?.split(",").filter(Boolean) ?? [],
    [searchParams]
  );
  const selectedSizes = useMemo(
    () => searchParams.get("size")?.split(",").filter(Boolean) ?? [],
    [searchParams]
  );
  const selectedPrice = searchParams.get("price");
  const sort = searchParams.get("sort") ?? "featured";

  const activeCount =
    selectedCategories.length +
    selectedCollections.length +
    selectedSizes.length +
    (selectedPrice ? 1 : 0);

  // ── URL helpers ───────────────────────────────────────────────────────────
  const setParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.replace(`/shop?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const toggleFilter = useCallback(
    (key: "category" | "collection" | "size", value: string) => {
      const current =
        key === "category"
          ? selectedCategories
          : key === "collection"
          ? selectedCollections
          : selectedSizes;
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setParam(key, next.length > 0 ? next.join(",") : null);
    },
    [selectedCategories, selectedCollections, selectedSizes, setParam]
  );

  const clearAll = useCallback(() => {
    router.replace("/shop", { scroll: false });
  }, [router]);

  // ── Filter + sort ─────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0)
      result = result.filter((p) => selectedCategories.includes(p.category));

    if (selectedCollections.length > 0)
      result = result.filter((p) => selectedCollections.includes(p.collection));

    if (selectedSizes.length > 0)
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));

    if (selectedPrice) {
      const range = PRICE_RANGES.find((r) => r.id === selectedPrice);
      if (range)
        result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "newest")
      result = [
        ...result.filter((p) => p.tag === "NEW"),
        ...result.filter((p) => p.tag !== "NEW"),
      ];

    return result;
  }, [selectedCategories, selectedCollections, selectedSizes, selectedPrice, sort]);

  // ── Active filter chips ───────────────────────────────────────────────────
  const activeChips: { label: string; onRemove: () => void }[] = [
    ...selectedCategories.map((c) => ({
      label: c,
      onRemove: () => toggleFilter("category", c),
    })),
    ...selectedCollections.map((c) => ({
      label: c.replace("-", " ").toUpperCase(),
      onRemove: () => toggleFilter("collection", c),
    })),
    ...selectedSizes.map((s) => ({
      label: s,
      onRemove: () => toggleFilter("size", s),
    })),
    ...(selectedPrice
      ? [
          {
            label: PRICE_RANGES.find((r) => r.id === selectedPrice)?.label ?? selectedPrice,
            onRemove: () => setParam("price", null),
          },
        ]
      : []),
  ];

  const filterPanelProps = {
    selectedCategories,
    selectedCollections,
    selectedSizes,
    selectedPrice,
    activeCount,
    onToggle: toggleFilter,
    onPriceSelect: (val: string | null) => setParam("price", val),
    onClearAll: clearAll,
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Page header */}
        <div
          className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-8 md:py-12"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/"
              className="text-xs tracking-widest uppercase opacity-40 hover:opacity-70 transition-opacity"
              style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
            >
              Home
            </Link>
            <span className="text-xs opacity-30" style={{ color: "var(--text)" }}>/</span>
            <span
              className="text-xs tracking-widest uppercase opacity-70"
              style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
            >
              Shop
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold uppercase leading-none"
            style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
          >
            All Products
          </h1>
          <p
            className="mt-2 text-xs"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
          >
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
        </div>

        {/* Body: sidebar + grid */}
        <div className="max-w-screen-2xl mx-auto flex">
          {/* Desktop sidebar */}
          <aside
            className="hidden lg:block w-64 xl:w-72 flex-shrink-0 px-6 xl:px-8 py-8 sticky top-16 self-start"
            style={{ borderRight: "1px solid var(--border)", maxHeight: "calc(100vh - 4rem)", overflowY: "auto" }}
          >
            <FilterPanel {...filterPanelProps} />
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 px-6 lg:px-8 py-8">
            {/* Toolbar: mobile filter + active chips + sort */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {/* Mobile filter button */}
              <button
                onClick={() => setSheetOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase cursor-pointer transition-opacity hover:opacity-80"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  backgroundColor: "transparent",
                }}
              >
                <FilterIcon />
                Filter
                {activeCount > 0 && (
                  <span
                    className="ml-0.5 w-4 h-4 rounded-full text-[10px] flex items-center justify-center"
                    style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
                  >
                    {activeCount}
                  </span>
                )}
              </button>

              {/* Active filter chips */}
              {activeChips.map((chip) => (
                <span
                  key={chip.label}
                  className="flex items-center gap-1.5 px-3 py-1 text-[11px] tracking-wider uppercase"
                  style={{
                    border: "1px solid var(--accent)",
                    color: "var(--accent)",
                    fontFamily: "var(--font-rajdhani)",
                    fontWeight: 600,
                  }}
                >
                  {chip.label}
                  <button
                    onClick={chip.onRemove}
                    className="opacity-60 hover:opacity-100 cursor-pointer"
                    aria-label={`Remove ${chip.label} filter`}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="1" y1="1" x2="9" y2="9" />
                      <line x1="9" y1="1" x2="1" y2="9" />
                    </svg>
                  </button>
                </span>
              ))}

              {/* Sort — pushed to far right */}
              <div className="ml-auto flex items-center gap-3">
                <label
                  htmlFor="sort"
                  className="text-xs tracking-widest uppercase hidden sm:block"
                  style={{ color: "var(--text-muted)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
                >
                  Sort
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setParam("sort", e.target.value === "featured" ? null : e.target.value)}
                  className="text-xs tracking-wide uppercase appearance-none cursor-pointer px-3 py-2 pr-7 outline-none transition-colors"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    fontFamily: "var(--font-rajdhani)",
                    fontWeight: 600,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237A7570' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 10px center",
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id} style={{ backgroundColor: "var(--bg)" }}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 gap-4">
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "var(--text-muted)", fontFamily: "var(--font-rajdhani)" }}
                >
                  No products match your filters
                </p>
                <button
                  onClick={clearAll}
                  className="text-xs tracking-widest uppercase transition-opacity hover:opacity-80 cursor-pointer px-6 py-3"
                  style={{
                    border: "1px solid var(--text)",
                    color: "var(--text)",
                    fontFamily: "var(--font-rajdhani)",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    backgroundColor: "transparent",
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile filter bottom sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSheetOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-lg overflow-hidden flex flex-col"
              style={{
                backgroundColor: "var(--bg)",
                borderTop: "1px solid var(--border)",
                maxHeight: "85vh",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
            >
              {/* Sheet header */}
              <div
                className="flex items-center justify-between px-6 py-4 flex-shrink-0"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700, color: "var(--text)", letterSpacing: "0.2em" }}
                >
                  Filters {activeCount > 0 && `(${activeCount})`}
                </span>
                <button
                  onClick={() => setSheetOpen(false)}
                  className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ color: "var(--text)" }}
                  aria-label="Close filters"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Scrollable filter content */}
              <div className="flex-1 overflow-y-auto px-6 pb-4">
                <FilterPanel {...filterPanelProps} />
              </div>

              {/* Done button */}
              <div className="px-6 py-4 flex-shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
                <button
                  onClick={() => setSheetOpen(false)}
                  className="w-full py-3.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-80 cursor-pointer"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--bg)",
                    fontFamily: "var(--font-rajdhani)",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    border: "none",
                  }}
                >
                  View {filtered.length} {filtered.length === 1 ? "Product" : "Products"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
