"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart, type CartItem } from "@/contexts/CartContext";
import { products } from "@/lib/products";

// ── Icons ─────────────────────────────────────────────────────────────────────

function MinusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

// ── Cart item row ─────────────────────────────────────────────────────────────

function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem, updateQuantity } = useCart();

  const product = products.find((p) => p.id === item.id);
  const category = product?.category ?? "";
  const collectionLabel = product?.collection
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ") ?? "";

  const lineTotal = item.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25 }}
      className="flex gap-4 md:gap-6 py-6"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      {/* Image placeholder */}
      <Link
        href={product ? `/shop/${product.slug}` : "/shop"}
        className="flex-shrink-0 relative overflow-hidden"
        style={{
          width: "96px",
          aspectRatio: "3/4",
          backgroundColor: "var(--surface)",
          minWidth: "96px",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 60% 70%, rgba(200,169,110,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center px-2 opacity-[0.06] pointer-events-none"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          <span
            className="text-xs font-bold uppercase tracking-widest text-center leading-tight"
            style={{ color: "var(--text)" }}
          >
            {item.name}
          </span>
        </div>
      </Link>

      {/* Info + controls */}
      <div className="flex-1 min-w-0 flex flex-col gap-3">
        {/* Name row + remove */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={product ? `/shop/${product.slug}` : "/shop"}
              className="block transition-opacity hover:opacity-70"
            >
              <h3
                className="text-sm font-semibold uppercase tracking-wide leading-snug"
                style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
              >
                {item.name}
              </h3>
            </Link>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
            >
              {[category, collectionLabel].filter(Boolean).join(" · ")}
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
            >
              Size: {item.size}
            </p>
          </div>

          <button
            onClick={() => removeItem(item.id, item.size)}
            aria-label={`Remove ${item.name}`}
            className="flex-shrink-0 opacity-30 hover:opacity-80 transition-opacity cursor-pointer mt-0.5"
            style={{ color: "var(--text)" }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Quantity + price */}
        <div className="flex items-center justify-between mt-auto">
          {/* Stepper */}
          <div
            className="flex items-center"
            style={{ border: "1px solid var(--border)" }}
          >
            <button
              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="w-8 h-8 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ color: "var(--text)" }}
            >
              <MinusIcon />
            </button>
            <span
              className="w-8 h-8 flex items-center justify-center text-xs select-none"
              style={{ fontFamily: "var(--font-dm-sans)", color: "var(--text)", borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
              aria-label="Increase quantity"
              className="w-8 h-8 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ color: "var(--text)" }}
            >
              <PlusIcon />
            </button>
          </div>

          {/* Line total */}
          <span
            className="text-sm"
            style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            ${lineTotal.toLocaleString("en-US", { minimumFractionDigits: 0 })}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-28 md:py-40 gap-6"
    >
      {/* Minimal bag outline */}
      <svg
        width="48" height="48" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1"
        className="opacity-20"
        style={{ color: "var(--text)" }}
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      <div className="text-center">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-2 opacity-40"
          style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
        >
          Your bag is empty
        </p>
        <p
          className="text-xs"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
        >
          Add items from the shop to get started.
        </p>
      </div>

      <Link
        href="/shop"
        className="inline-block px-8 py-3.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
        style={{
          backgroundColor: "var(--accent)",
          color: "var(--bg)",
          fontFamily: "var(--font-rajdhani)",
          fontWeight: 700,
          letterSpacing: "0.2em",
        }}
      >
        Continue Shopping
      </Link>
    </motion.div>
  );
}

// ── Order summary ─────────────────────────────────────────────────────────────

const SHIPPING_THRESHOLD = 200;
const FLAT_SHIPPING = 15;

function OrderSummary({ subtotal }: { subtotal: number }) {
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  const badges = [
    { icon: <LockIcon />,   label: "Secure Checkout" },
    { icon: <ReturnIcon />, label: "Free Returns" },
    { icon: <ShieldIcon />, label: "Authenticity Guaranteed" },
  ];

  return (
    <div
      className="p-6 md:p-8"
      style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}
    >
      <h2
        className="text-xs tracking-[0.25em] uppercase mb-6"
        style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700, color: "var(--text)", letterSpacing: "0.2em" }}
      >
        Order Summary
      </h2>

      {/* Line items */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between">
          <span
            className="text-xs"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
          >
            Subtotal
          </span>
          <span
            className="text-xs"
            style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}
          >
            ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 0 })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span
            className="text-xs"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
          >
            Shipping
          </span>
          <span
            className="text-xs"
            style={{
              color: shipping === 0 ? "var(--accent)" : "var(--text)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {shipping === 0 ? "Complimentary" : `$${FLAT_SHIPPING}`}
          </span>
        </div>

        {shipping > 0 && (
          <p
            className="text-[11px] -mt-1"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
          >
            Free on orders over ${SHIPPING_THRESHOLD}
          </p>
        )}
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--border)" }} className="mb-6" />

      {/* Total */}
      <div className="flex items-center justify-between mb-6">
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700, color: "var(--text)", letterSpacing: "0.12em" }}
        >
          Estimated Total
        </span>
        <motion.span
          key={total}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className="text-base font-semibold"
          style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}
        >
          ${total.toLocaleString("en-US", { minimumFractionDigits: 0 })}
        </motion.span>
      </div>

      {/* CTA */}
      <button
        className="w-full py-4 text-xs tracking-widest uppercase cursor-pointer transition-opacity hover:opacity-85 mb-3"
        style={{
          backgroundColor: "var(--accent)",
          color: "var(--bg)",
          fontFamily: "var(--font-rajdhani)",
          fontWeight: 700,
          letterSpacing: "0.2em",
          border: "none",
        }}
      >
        Proceed to Checkout
      </button>

      <p
        className="text-[11px] text-center mb-6"
        style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
      >
        Taxes calculated at checkout
      </p>

      {/* Security badges */}
      <div
        className="flex items-center justify-around pt-5"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {badges.map(({ icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <span className="opacity-40" style={{ color: "var(--text)" }}>
              {icon}
            </span>
            <span
              className="text-[10px] tracking-wide text-center"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CartPage() {
  const { items, totalItems, totalPrice } = useCart();
  const isEmpty = items.length === 0;

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pt-16">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          {/* Page header */}
          <div
            className="py-8 md:py-12"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <h1
              className="text-4xl md:text-5xl font-bold uppercase leading-none"
              style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
            >
              Your Bag
            </h1>
            <AnimatePresence mode="wait">
              <motion.p
                key={totalItems}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs mt-2"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
              >
                {totalItems === 0 ? "No items" : `${totalItems} ${totalItems === 1 ? "item" : "items"}`}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Body */}
          <AnimatePresence mode="wait">
            {isEmpty ? (
              <EmptyState key="empty" />
            ) : (
              <motion.div
                key="items"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-12 lg:gap-16 py-10"
              >
                {/* Left — items */}
                <div>
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartItemRow key={`${item.id}-${item.size}`} item={item} />
                    ))}
                  </AnimatePresence>

                  {/* Continue shopping link */}
                  <div className="mt-8">
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
                      style={{
                        color: "var(--text)",
                        fontFamily: "var(--font-rajdhani)",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        opacity: 0.5,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Continue Shopping
                    </Link>
                  </div>
                </div>

                {/* Right — summary (sticky on desktop) */}
                <div className="lg:sticky lg:top-24 self-start">
                  <OrderSummary subtotal={totalPrice} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
