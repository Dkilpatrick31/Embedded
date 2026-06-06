"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useCartDrawer } from "@/contexts/CartDrawerContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { type Product, products, COLLECTIONS } from "@/lib/products";
import ProductCard from "@/app/shop/ProductCard";

// ── Gallery ───────────────────────────────────────────────────────────────────

const GALLERY_VIEWS = [
  { label: "Front",    gradient: "radial-gradient(ellipse at 60% 70%, rgba(200,169,110,0.09) 0%, transparent 65%)" },
  { label: "Back",     gradient: "radial-gradient(ellipse at 35% 30%, rgba(200,169,110,0.06) 0%, transparent 65%)" },
  { label: "Detail",   gradient: "radial-gradient(ellipse at 75% 50%, rgba(200,169,110,0.07) 0%, transparent 55%)" },
  { label: "On Model", gradient: "radial-gradient(ellipse at 28% 65%, rgba(200,169,110,0.05) 0%, transparent 70%)" },
];

// ── Size guide data ───────────────────────────────────────────────────────────

const APPAREL_CHART = [
  { size: "XS",  chest: '32–34"', waist: '26–28"', hip: '35–37"', length: '25"' },
  { size: "S",   chest: '34–36"', waist: '28–30"', hip: '37–39"', length: '26"' },
  { size: "M",   chest: '36–38"', waist: '30–32"', hip: '39–41"', length: '27"' },
  { size: "L",   chest: '38–40"', waist: '32–34"', hip: '41–43"', length: '28"' },
  { size: "XL",  chest: '40–42"', waist: '34–36"', hip: '43–45"', length: '29"' },
  { size: "XXL", chest: '42–44"', waist: '36–38"', hip: '45–47"', length: '30"' },
];

// ── Accordion ─────────────────────────────────────────────────────────────────

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: "1px solid var(--border)" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 cursor-pointer"
        style={{ color: "var(--text)" }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700, letterSpacing: "0.15em" }}
        >
          {title}
        </span>
        <motion.svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="pb-5 text-xs leading-relaxed"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Size guide modal ──────────────────────────────────────────────────────────

function SizeGuideModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-50"
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      <motion.div
        className="fixed inset-x-4 z-50 mx-auto overflow-y-auto"
        style={{
          top: "50%",
          maxWidth: "520px",
          maxHeight: "80vh",
          backgroundColor: "var(--bg)",
          border: "1px solid var(--border)",
          translateY: "-50%",
        }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3
              className="text-sm tracking-widest uppercase"
              style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700, color: "var(--text)", letterSpacing: "0.2em" }}
            >
              Size Guide
            </h3>
            <button
              onClick={onClose}
              className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ color: "var(--text)" }}
              aria-label="Close size guide"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Measurement note */}
          <p
            className="text-xs leading-relaxed mb-6"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
          >
            All measurements in inches. For the best fit, measure your body — not your clothes — and size up if you are between sizes.
          </p>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Size", "Chest", "Waist", "Hip", "Length"].map((h) => (
                    <th
                      key={h}
                      className="pb-3 text-left tracking-widest uppercase pr-4"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-rajdhani)", fontWeight: 700, letterSpacing: "0.12em" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {APPAREL_CHART.map((row, i) => (
                  <tr
                    key={row.size}
                    style={{ borderBottom: i < APPAREL_CHART.length - 1 ? "1px solid var(--border)" : "none" }}
                  >
                    {[row.size, row.chest, row.waist, row.hip, row.length].map((val, j) => (
                      <td
                        key={j}
                        className="py-3 pr-4"
                        style={{
                          color: j === 0 ? "var(--text)" : "var(--text-muted)",
                          fontFamily: j === 0 ? "var(--font-rajdhani)" : "var(--font-dm-sans)",
                          fontWeight: j === 0 ? 700 : 400,
                        }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p
            className="text-xs mt-6 pt-5"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)", borderTop: "1px solid var(--border)" }}
          >
            Trouser sizes are labelled as Waist/Inseam in inches. If you are between sizes, we recommend sizing up for a relaxed fit.
          </p>
        </div>
      </motion.div>
    </>
  );
}

// ── Accordion content helpers ─────────────────────────────────────────────────

function getProductDetails(product: Product) {
  const materials: Record<Product["collection"], string> = {
    "flight-deck": "100% technical ripstop shell with bonded mesh lining. Hardware: YKK Aquaguard zippers.",
    "atc":         "340gsm cotton-polyester fleece. Ribbed cuffs and hem in 2×2 cotton rib.",
    "horizon":     "Satin polyester shell, 100% cotton French terry lining. Ribbed collar and cuffs.",
    "altimeter":   "98% Japanese stretch-twill, 2% elastane. Moisture-wicking internal waistband.",
  };
  return `${materials[product.collection]} Fit: slim-tapered. Model is 6'1" and wears size M.`;
}

// ── Main component ────────────────────────────────────────────────────────────

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5"
      fill={filled ? "currentColor" : "none"} stroke="currentColor">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { openDrawer } = useCartDrawer();
  const { toggleItem, isWishlisted } = useWishlist();

  const [selectedView, setSelectedView] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const handleWishlist = () => toggleItem({
    id: product.id, name: product.name, slug: product.slug,
    price: product.price, category: product.category,
  });

  const collectionLabel =
    COLLECTIONS.find((c) => c.id === product.collection)?.label ?? product.collection;

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem({ id: product.id, name: product.name, price: product.price, size: selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
    openDrawer();
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setSizeError(false);
  };

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const fallbackRelated = related.length < 4
    ? [...related, ...products.filter((p) => p.id !== product.id && !related.includes(p)).slice(0, 4 - related.length)]
    : related;

  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-5" aria-label="Breadcrumb">
          {[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.name, href: null },
          ].map((crumb, i, arr) => (
            <span key={crumb.label} className="flex items-center gap-2">
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-xs tracking-widest uppercase transition-opacity hover:opacity-70 opacity-40"
                  style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className="text-xs tracking-widest uppercase opacity-70"
                  style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
                >
                  {crumb.label}
                </span>
              )}
              {i < arr.length - 1 && (
                <span className="text-xs opacity-25" style={{ color: "var(--text)" }}>/</span>
              )}
            </span>
          ))}
        </nav>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 pb-24">

          {/* ── LEFT: Gallery ── */}
          <div>
            {/* Main image */}
            <div
              className="relative overflow-hidden mb-3"
              style={{ aspectRatio: "3/4", backgroundColor: "var(--surface)" }}
            >
              {/* Grid texture */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid-pdp" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-pdp)" />
                </svg>
              </div>

              {/* Animated radial glow changes with view */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedView}
                  className="absolute inset-0"
                  style={{ background: GALLERY_VIEWS[selectedView].gradient }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                />
              </AnimatePresence>

              {/* Product name watermark */}
              <div
                className="absolute inset-0 flex items-center justify-center px-8 opacity-[0.055] pointer-events-none"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                <span
                  className="text-5xl font-bold uppercase tracking-widest text-center leading-tight"
                  style={{ color: "var(--text)" }}
                >
                  {product.name}
                </span>
              </div>

              {/* View label */}
              <div className="absolute bottom-4 right-4">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={selectedView}
                    className="text-[10px] tracking-widest uppercase"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-rajdhani)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {String(selectedView + 1).padStart(2, "0")} / {GALLERY_VIEWS[selectedView].label}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Tag */}
              {product.tag && (
                <div
                  className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] tracking-widest uppercase"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--bg)",
                    fontFamily: "var(--font-rajdhani)",
                    fontWeight: 700,
                  }}
                >
                  {product.tag}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {GALLERY_VIEWS.map((view, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedView(i)}
                  className="relative overflow-hidden cursor-pointer"
                  aria-label={`View ${view.label}`}
                  style={{
                    aspectRatio: "3/4",
                    backgroundColor: "var(--surface)",
                    border: `1px solid ${selectedView === i ? "var(--accent)" : "transparent"}`,
                    transition: "border-color 0.2s",
                  }}
                >
                  <div className="absolute inset-0" style={{ background: view.gradient }} />
                  <div
                    className="absolute inset-0 flex items-end justify-start p-2 opacity-30"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    <span className="text-[9px] tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Product info ── */}
          <div className="lg:pt-2">
            {/* Collection label */}
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
            >
              {collectionLabel} Collection
            </p>

            {/* Name */}
            <h1
              className="text-4xl xl:text-5xl font-bold uppercase leading-none mb-4"
              style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <p
              className="text-2xl mb-6"
              style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
            >
              ${product.price}
            </p>

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
            >
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700, color: "var(--text)", letterSpacing: "0.15em" }}
                >
                  Size{selectedSize ? `: ${selectedSize}` : ""}
                </span>
                <button
                  onClick={() => setSizeModalOpen(true)}
                  className="text-xs tracking-wider uppercase transition-opacity hover:opacity-100 opacity-50 cursor-pointer"
                  style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
                >
                  Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className="px-4 py-2 text-xs tracking-wider uppercase transition-all cursor-pointer"
                      style={{
                        fontFamily: "var(--font-rajdhani)",
                        fontWeight: 600,
                        border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                        color: active ? "var(--accent)" : "var(--text)",
                        backgroundColor: "transparent",
                        opacity: active ? 1 : 0.7,
                        letterSpacing: "0.1em",
                      }}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {sizeError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-xs mt-2.5 tracking-wide"
                    style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}
                  >
                    Please select a size to continue
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Add to Bag + Wishlist row */}
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 py-4 text-xs tracking-widest uppercase cursor-pointer overflow-hidden relative"
                style={{
                  backgroundColor: added ? "transparent" : "var(--accent)",
                  border: added ? "1px solid var(--accent)" : "1px solid transparent",
                  color: added ? "var(--accent)" : "var(--bg)",
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  transition: "background-color 0.25s, color 0.25s, border-color 0.25s",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={added ? "added" : "default"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center gap-2"
                  >
                    {added ? "Added ✓" : "Add to Bag"}
                  </motion.span>
                </AnimatePresence>
              </button>

              <motion.button
                onClick={handleWishlist}
                whileTap={{ scale: 0.88 }}
                aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
                className="flex-shrink-0 px-4 flex items-center gap-2 text-xs tracking-widest uppercase cursor-pointer transition-colors"
                style={{
                  border: `1px solid ${wishlisted ? "var(--accent)" : "var(--border)"}`,
                  color: wishlisted ? "var(--accent)" : "var(--text)",
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                }}
              >
                <HeartIcon filled={wishlisted} />
                <AnimatePresence mode="wait">
                  {wishlisted && (
                    <motion.span
                      key="wishlisted"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      Wishlisted
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Accordion sections */}
            <div className="mt-6">
              <Accordion title="Product Details">
                <p>{getProductDetails(product)}</p>
              </Accordion>

              <Accordion title="Care Instructions">
                <ul className="space-y-1.5 list-none">
                  {[
                    "Machine wash cold, gentle cycle",
                    "Do not tumble dry — lay flat or hang to dry",
                    "Iron on low heat if required",
                    "Do not dry clean",
                    "Wash inside out to preserve finish",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span style={{ color: "var(--accent)" }}>—</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </Accordion>

              <Accordion title="Shipping & Returns">
                <ul className="space-y-1.5 list-none">
                  {[
                    "Complimentary standard shipping on orders over $250",
                    "Express and overnight shipping available at checkout",
                    "Free returns within 30 days of delivery",
                    "Items must be unworn and in original packaging",
                    "Final sale items are not eligible for return",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span style={{ color: "var(--accent)" }}>—</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </Accordion>

              {/* Bottom border */}
              <div style={{ borderTop: "1px solid var(--border)" }} />
            </div>
          </div>
        </div>

        {/* ── Related products ── */}
        {fallbackRelated.length > 0 && (
          <section
            className="py-16"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <div className="flex items-end justify-between mb-10">
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-3"
                  style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)" }}
                >
                  {product.category} · {collectionLabel}
                </p>
                <h2
                  className="text-3xl md:text-4xl font-bold uppercase leading-none"
                  style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
                >
                  You May
                  <br />
                  Also Like
                </h2>
              </div>
              <Link
                href="/shop"
                className="hidden md:inline-flex items-center gap-2 text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
                style={{
                  color: "var(--text)",
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                }}
              >
                View All
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
              {fallbackRelated.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {sizeModalOpen && <SizeGuideModal onClose={() => setSizeModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
