"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-end overflow-hidden">
      {/* Editorial image placeholder */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--surface)" }}
      >
        {/* Grid overlay simulating editorial photography */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Horizon line — aviation motif */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-10">
          <div className="w-px h-32" style={{ backgroundColor: "var(--accent)" }} />
          <div className="w-24 h-px" style={{ backgroundColor: "var(--accent)" }} />
          <div className="w-px h-32" style={{ backgroundColor: "var(--accent)" }} />
        </div>

        {/* Altitude text watermark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold leading-none select-none opacity-[0.03] whitespace-nowrap"
          style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
        >
          FL 410
        </div>
      </div>

      {/* Gradient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, var(--bg) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 lg:px-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)" }}
          >
            Spring / Summer 2025 Collection
          </p>

          <h1
            className="text-6xl lg:text-8xl font-bold uppercase leading-none mb-6"
            style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
          >
            Above
            <br />
            The Line
          </h1>

          <p
            className="text-sm leading-relaxed mb-8 max-w-md"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
          >
            Precision-engineered garments for the cockpit and beyond. Where
            aviation heritage meets modern craft.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/collections"
              className="inline-block px-8 py-3.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg)",
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 600,
                letterSpacing: "0.15em",
              }}
            >
              Shop Collection
            </Link>
            <Link
              href="/about"
              className="inline-block px-8 py-3.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{
                border: "1px solid var(--text)",
                color: "var(--text)",
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 600,
                letterSpacing: "0.15em",
              }}
            >
              Our Story
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute right-12 bottom-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span
            className="text-[10px] tracking-widest uppercase rotate-90 origin-center"
            style={{ color: "var(--text-muted)" }}
          >
            Scroll
          </span>
          <motion.div
            className="w-px h-12"
            style={{ backgroundColor: "var(--accent)" }}
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
