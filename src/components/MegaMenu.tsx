"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

interface MenuLink   { label: string; href: string; }
interface MenuColumn { heading: string; links: MenuLink[]; }
interface Featured   { label: string; collection: string; href: string; }
interface MenuData   { columns: MenuColumn[]; featured: Featured; }

// ── Data ──────────────────────────────────────────────────────────────────────

const MENUS: Record<string, MenuData> = {
  Men: {
    columns: [
      {
        heading: "New In",
        links: [
          { label: "New Arrivals",  href: "/shop?category=Men" },
          { label: "This Week",     href: "/shop?category=Men" },
          { label: "Bestsellers",   href: "/shop?category=Men" },
        ],
      },
      {
        heading: "Clothing",
        links: [
          { label: "Jackets",   href: "/shop?category=Men&collection=flight-deck" },
          { label: "Hoodies",   href: "/shop?category=Men&collection=atc" },
          { label: "T-Shirts",  href: "/shop?category=Men&collection=flight-deck" },
          { label: "Trousers",  href: "/shop?category=Men&collection=altimeter" },
        ],
      },
      {
        heading: "Collections",
        links: [
          { label: "Flight Deck", href: "/collections/flight-deck" },
          { label: "ATC",         href: "/collections/atc" },
          { label: "Horizon",     href: "/collections/horizon" },
          { label: "Altimeter",   href: "/collections/altimeter" },
        ],
      },
    ],
    featured: { label: "Flight Deck SS25", collection: "Flight Deck", href: "/collections/flight-deck" },
  },

  Women: {
    columns: [
      {
        heading: "New In",
        links: [
          { label: "New Arrivals", href: "/shop?category=Women" },
          { label: "This Week",    href: "/shop?category=Women" },
          { label: "Bestsellers",  href: "/shop?category=Women" },
        ],
      },
      {
        heading: "Clothing",
        links: [
          { label: "Hoodies",    href: "/shop?category=Women&collection=atc" },
          { label: "Crewnecks",  href: "/shop?category=Women&collection=atc" },
          { label: "Bombers",    href: "/shop?category=Women&collection=horizon" },
          { label: "Joggers",    href: "/shop?category=Women&collection=horizon" },
        ],
      },
      {
        heading: "Collections",
        links: [
          { label: "Flight Deck", href: "/collections/flight-deck" },
          { label: "ATC",         href: "/collections/atc" },
          { label: "Horizon",     href: "/collections/horizon" },
          { label: "Altimeter",   href: "/collections/altimeter" },
        ],
      },
    ],
    featured: { label: "ATC Knitwear", collection: "ATC", href: "/collections/atc" },
  },

  Gear: {
    columns: [
      {
        heading: "Accessories",
        links: [
          { label: "Caps",    href: "/shop?category=Gear" },
          { label: "Bags",    href: "/shop?category=Gear" },
          { label: "Patches", href: "/shop?category=Gear" },
        ],
      },
      {
        heading: "Lifestyle",
        links: [
          { label: "Mugs",      href: "/shop?category=Gear" },
          { label: "Posters",   href: "/shop?category=Gear" },
          { label: "Gear Bags", href: "/shop?category=Gear" },
        ],
      },
    ],
    featured: { label: "Altimeter SS25", collection: "Altimeter", href: "/collections/altimeter" },
  },
};

// ── Hoverable link ────────────────────────────────────────────────────────────

function NavMenuLink({ href, label, onClose }: MenuLink & { onClose: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onClick={onClose}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-sm uppercase tracking-wide block transition-colors"
      style={{
        color: hovered ? "var(--accent)" : "var(--text)",
        fontFamily: "var(--font-rajdhani)",
        fontWeight: 600,
        letterSpacing: "0.08em",
        transition: "color 0.15s ease",
      }}
    >
      {label}
    </Link>
  );
}

// ── Featured editorial card ───────────────────────────────────────────────────

function FeaturedCard({ data, onClose }: { data: Featured; onClose: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={data.href}
      onClick={onClose}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block h-full"
      style={{ minHeight: "180px" }}
    >
      <div
        className="relative overflow-hidden h-full flex flex-col justify-end p-5"
        style={{
          backgroundColor: "var(--surface)",
          border: `1px solid ${hovered ? "var(--accent)" : "transparent"}`,
          transition: "border-color 0.25s ease",
        }}
      >
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="mega-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mega-grid)" />
          </svg>
        </div>

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(200,169,110,0.09) 0%, transparent 70%)" }}
        />

        {/* Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          <span
            className="text-5xl font-bold uppercase tracking-widest text-center"
            style={{ color: "var(--text)" }}
          >
            {data.collection}
          </span>
        </div>

        {/* Horizon motif */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-[0.06] pointer-events-none">
          <div className="w-px h-12" style={{ backgroundColor: "var(--accent)" }} />
          <div className="w-10 h-px" style={{ backgroundColor: "var(--accent)" }} />
          <div className="w-px h-12" style={{ backgroundColor: "var(--accent)" }} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <p
            className="text-[10px] tracking-[0.25em] uppercase mb-1.5"
            style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
          >
            Featured
          </p>
          <p
            className="text-base font-bold uppercase leading-tight mb-3"
            style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)" }}
          >
            {data.label}
          </p>
          <span
            className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase"
            style={{
              color: hovered ? "var(--text)" : "var(--accent)",
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 600,
              transition: "color 0.15s ease",
            }}
          >
            Shop Now
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Panel ─────────────────────────────────────────────────────────────────────

export interface MegaMenuPanelProps {
  activeMenu: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

export default function MegaMenuPanel({
  activeMenu,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: MegaMenuPanelProps) {
  const menu = MENUS[activeMenu];
  if (!menu) return null;

  const totalCols = menu.columns.length + 1; // link columns + featured card

  return (
    <motion.div
      className="absolute top-full left-0 right-0 hidden md:block overflow-hidden"
      style={{
        backgroundColor: "var(--bg)",
        borderBottom: "1px solid var(--border)",
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="grid gap-8"
            style={{ gridTemplateColumns: `repeat(${totalCols}, 1fr)` }}
          >
            {/* Link columns */}
            {menu.columns.map((col) => (
              <div key={col.heading}>
                <p
                  className="text-[10px] tracking-[0.28em] uppercase mb-5"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-rajdhani)",
                    fontWeight: 700,
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: "10px",
                  }}
                >
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-3.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <NavMenuLink {...link} onClose={onClose} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Featured card */}
            <FeaturedCard data={menu.featured} onClose={onClose} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export { MENUS };
