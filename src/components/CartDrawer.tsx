"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart, type CartItem } from "@/contexts/CartContext";
import { useCartDrawer } from "@/contexts/CartDrawerContext";

// ── Icons ─────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ── Individual cart item ──────────────────────────────────────────────────────

function DrawerItem({ item }: { item: CartItem }) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 24, transition: { duration: 0.18 } }}
      className="flex gap-3 py-4"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      {/* Image placeholder */}
      <div
        className="flex-shrink-0 relative overflow-hidden"
        style={{ width: "68px", aspectRatio: "3/4", backgroundColor: "var(--surface)" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 60% 70%, rgba(200,169,110,0.07) 0%, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center px-1 opacity-[0.06] pointer-events-none"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          <span className="text-[8px] font-bold uppercase tracking-widest text-center leading-tight" style={{ color: "var(--text)" }}>
            {item.name}
          </span>
        </div>
      </div>

      {/* Info + controls */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        {/* Name + remove */}
        <div className="flex items-start justify-between gap-2">
          <h4
            className="text-xs font-semibold uppercase tracking-wide leading-snug"
            style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
          >
            {item.name}
          </h4>
          <button
            onClick={() => removeItem(item.id, item.size)}
            aria-label={`Remove ${item.name}`}
            className="flex-shrink-0 opacity-30 hover:opacity-80 transition-opacity cursor-pointer mt-px"
            style={{ color: "var(--text)" }}
          >
            <CloseIcon />
          </button>
        </div>

        <p className="text-[11px]" style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}>
          Size: {item.size}
        </p>

        {/* Qty + line price */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex items-center" style={{ border: "1px solid var(--border)" }}>
            <button
              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="w-6 h-6 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ color: "var(--text)" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <span
              className="w-6 h-6 flex items-center justify-center text-[11px] select-none"
              style={{
                color: "var(--text)",
                fontFamily: "var(--font-dm-sans)",
                borderLeft: "1px solid var(--border)",
                borderRight: "1px solid var(--border)",
              }}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
              aria-label="Increase quantity"
              className="w-6 h-6 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ color: "var(--text)" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          <span className="text-xs" style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}>
            ${(item.price * item.quantity).toLocaleString("en-US")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Drawer ────────────────────────────────────────────────────────────────────

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function CartDrawer() {
  const { isOpen, closeDrawer } = useCartDrawer();
  const { items, totalItems, totalPrice } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus trap + Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const drawer = drawerRef.current;

    // Move focus into drawer on open
    const firstFocusable = drawer?.querySelector<HTMLElement>(FOCUSABLE);
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeDrawer(); return; }
      if (e.key !== "Tab" || !drawer) return;

      const focusables = Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      prevFocus?.focus();
    };
  }, [isOpen, closeDrawer]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[59]"
            style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            className="fixed top-0 right-0 bottom-0 z-[60] flex flex-col w-full md:w-[400px]"
            style={{
              backgroundColor: "var(--bg)",
              borderLeft: "1px solid var(--border)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex items-baseline gap-3">
                <h2
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700, color: "var(--text)" }}
                >
                  Your Bag
                </h2>
                {totalItems > 0 && (
                  <span
                    className="text-[11px]"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
                  >
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                aria-label="Close bag"
                className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                style={{ color: "var(--text)" }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* ── Item list ── */}
            <div className="flex-1 overflow-y-auto px-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 py-16">
                  <svg
                    width="40" height="40" viewBox="0 0 24 24" fill="none"
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
                      className="text-xs tracking-widest uppercase opacity-40"
                      style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
                    >
                      Your bag is empty
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
                    >
                      Add items to get started.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={closeDrawer}
                    className="inline-block px-7 py-3 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--bg)",
                      fontFamily: "var(--font-rajdhani)",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                    }}
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <DrawerItem key={`${item.id}-${item.size}`} item={item} />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* ── Footer (always visible) ── */}
            {items.length > 0 && (
              <div
                className="flex-shrink-0 px-5 pt-4 pb-6"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700, color: "var(--text)", letterSpacing: "0.15em" }}
                  >
                    Subtotal
                  </span>
                  <motion.span
                    key={totalPrice}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="text-sm"
                    style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                  >
                    ${totalPrice.toLocaleString("en-US")}
                  </motion.span>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/cart"
                    onClick={closeDrawer}
                    className="w-full py-3 text-xs tracking-widest uppercase text-center transition-opacity hover:opacity-80 block"
                    style={{
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      fontFamily: "var(--font-rajdhani)",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                    }}
                  >
                    View Bag
                  </Link>
                  <button
                    className="w-full py-3 text-xs tracking-widest uppercase transition-opacity hover:opacity-85 cursor-pointer"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--bg)",
                      fontFamily: "var(--font-rajdhani)",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      border: "none",
                    }}
                  >
                    Checkout
                  </button>
                </div>

                <p
                  className="text-[11px] text-center mt-3"
                  style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
                >
                  Taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
