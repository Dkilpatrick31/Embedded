"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Seg {
  x1: number; y1: number;
  x2: number; y2: number;
  coreWidth: number;
  alphaMult: number; // depth-based dimming for branches
}

interface BoltTree {
  segs: Seg[];
  maxOpacity: number;
  startTime: number;
  holdMs: number; // ms at full brightness before fade
  fadeMs: number; // ms to fade to zero
}

const RGB = "180,210,255";

// ── Recursive midpoint-displacement bolt builder ───────────────────────────────

function buildBolt(
  x1: number, y1: number,
  x2: number, y2: number,
  roughness: number,
  depth: number,
  maxDepth: number,
  out: Seg[],
): void {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);

  if (depth >= maxDepth || len < 2) {
    out.push({
      x1, y1, x2, y2,
      coreWidth: Math.max(0.3, 1.8 - depth * 0.2),
      alphaMult: Math.max(0.15, 1 - depth * 0.09),
    });
    return;
  }

  // Perpendicular displacement of midpoint
  const perpX = -dy / len;
  const perpY = dx / len;
  const disp = (Math.random() - 0.5) * len * roughness;
  const mx = (x1 + x2) / 2 + perpX * disp;
  const my = (y1 + y2) / 2 + perpY * disp;

  buildBolt(x1, y1, mx, my, roughness * 0.6, depth + 1, maxDepth, out);
  buildBolt(mx, my, x2, y2, roughness * 0.6, depth + 1, maxDepth, out);

  // 30% chance to spawn a branch from the displaced midpoint
  if (depth < maxDepth - 1 && Math.random() < 0.3) {
    const mainAngle = Math.atan2(dy, dx);
    const side = Math.random() > 0.5 ? 1 : -1;
    const branchAngle = mainAngle + side * (0.26 + Math.random() * 0.35); // 15-35°
    const branchLen = len * (0.35 + Math.random() * 0.4);
    buildBolt(
      mx, my,
      mx + Math.cos(branchAngle) * branchLen,
      my + Math.sin(branchAngle) * branchLen,
      roughness * 0.5, depth + 2, maxDepth, out,
    );
  }
}

// ── Bolt tree factory: 1-2 trunks fired simultaneously ────────────────────────

function makeTree(w: number, h: number, now: number): BoltTree {
  const segs: Seg[] = [];
  const trunks = 1 + Math.floor(Math.random() * 2);
  for (let i = 0; i < trunks; i++) {
    const sx = w * (0.08 + Math.random() * 0.84);
    const ex = Math.max(0, Math.min(w, sx + (Math.random() - 0.5) * w * 0.35));
    const ey = h * (0.55 + Math.random() * 0.45);
    buildBolt(sx, -2, ex, ey, 0.65, 0, 8, segs);
  }
  return {
    segs,
    maxOpacity: 0.65 + Math.random() * 0.35,
    startTime: now,
    holdMs:  50 + Math.random() * 100,
    fadeMs: 200 + Math.random() * 200,
  };
}

// ── Three-pass bloom draw ─────────────────────────────────────────────────────

function drawTree(ctx: CanvasRenderingContext2D, tree: BoltTree, opacity: number, rgb: string) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Pass 1 — outer bloom (batched, lw=8, very low opacity)
  ctx.lineWidth = 8;
  ctx.strokeStyle = `rgba(${rgb},${opacity * 0.03})`;
  ctx.shadowBlur = 0;
  ctx.beginPath();
  for (const s of tree.segs) { ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); }
  ctx.stroke();

  // Pass 2 — mid bloom (batched, lw=4)
  ctx.lineWidth = 4;
  ctx.strokeStyle = `rgba(${rgb},${opacity * 0.08})`;
  ctx.beginPath();
  for (const s of tree.segs) { ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); }
  ctx.stroke();

  // Pass 3 — core (individual, varying widths + soft shadow)
  ctx.shadowBlur = 6;
  ctx.shadowColor = `rgba(${rgb},${opacity * 0.5})`;
  for (const s of tree.segs) {
    ctx.strokeStyle = `rgba(${rgb},${opacity * s.alphaMult})`;
    ctx.lineWidth = s.coreWidth;
    ctx.beginPath();
    ctx.moveTo(s.x1, s.y1);
    ctx.lineTo(s.x2, s.y2);
    ctx.stroke();
  }

  ctx.restore();
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  // Ref so the RAF loop always reads the latest bolt color without restarting
  const rgbRef = useRef(RGB);

  // Keep bolt color current — RAF loop reads rgbRef.current each frame
  useEffect(() => {
    rgbRef.current = isLight ? "20,40,120" : RGB;
  }, [isLight]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Canvas resize ─────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const trees:  BoltTree[] = [];
    const timers: ReturnType<typeof setTimeout>[] = [];
    let rafId: number;
    let mounted = true;

    // ── Brightness flicker via direct DOM style ───────────────────────────────
    const flicker = () => {
      section.style.filter = "brightness(1.2)";
      section.style.transition = "none";
      const t = setTimeout(() => {
        section.style.filter = "brightness(1)";
        section.style.transition = "filter 80ms ease";
      }, 40);
      timers.push(t);
    };

    // ── Strike: generate a new tree and flash ─────────────────────────────────
    const strike = () => {
      trees.push(makeTree(canvas.width, canvas.height, performance.now()));
      flicker();
    };

    // ── Schedule: 4–9 seconds between strikes ────────────────────────────────
    const schedule = () => {
      const delay = 4000 + Math.random() * 5000;
      const t = setTimeout(() => {
        if (!mounted) return;
        strike();
        schedule();
      }, delay);
      timers.push(t);
    };
    schedule();

    // ── RAF loop ──────────────────────────────────────────────────────────────
    const loop = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = trees.length - 1; i >= 0; i--) {
        const tree = trees[i];
        const elapsed = now - tree.startTime;
        const total = tree.holdMs + tree.fadeMs;
        if (elapsed >= total) { trees.splice(i, 1); continue; }

        const opacity = elapsed < tree.holdMs
          ? tree.maxOpacity
          : tree.maxOpacity * (1 - (elapsed - tree.holdMs) / tree.fadeMs);

        drawTree(ctx, tree, opacity, rgbRef.current);
      }

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      mounted = false;
      cancelAnimationFrame(rafId);
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", resize);
      section.style.filter = "";
      section.style.transition = "";
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[calc(100svh-52px)] min-h-[560px] md:h-screen flex items-end overflow-hidden"
      style={{ backgroundColor: isLight ? "#F5F2ED" : "#000000" }}
    >
      {/* Layer 2: Lightning canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Layer 3: Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -translate-y-[60px] md:-translate-y-[140px]">
        <Image
          src={isLight ? "/Embedded-Lightmode-Logo.png" : "/Embedded-Logo.jpeg"}
          alt=""
          width={1254}
          height={1254}
          className="w-[425px] md:w-[875px] h-auto"
          style={{ opacity: isLight ? 1 : 0.5, mixBlendMode: isLight ? "multiply" : "screen" }}
          priority
        />
      </div>

      {/* Layer 4: Vignette */}
      {!isLight && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, transparent 28%, rgba(0,0,0,0.6) 100%)" }}
          />
        </>
      )}

      {/* Layer 5: Content */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 lg:px-12 pb-6 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-2 md:mb-4"
            style={{ color: isLight ? "#0A0A0A" : "var(--accent)", fontFamily: "var(--font-rajdhani)" }}
          >
            Spring / Summer 2025 Collection
          </p>

          <h1
            className="text-5xl md:text-6xl lg:text-8xl font-bold uppercase leading-none mb-3 md:mb-6"
            style={{ fontFamily: "var(--font-rajdhani)", color: isLight ? "#0A0A0A" : "#ffffff" }}
          >
            Above
            <br />
            The Line
          </h1>

          <p
            className="text-sm leading-relaxed mb-4 md:mb-8 max-w-md"
            style={{ color: isLight ? "#444444" : "rgba(255,255,255,0.55)", fontFamily: "var(--font-dm-sans)" }}
          >
            Precision-engineered garments for the cockpit and beyond. Where
            aviation heritage meets modern craft.
          </p>

          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <Link
              href="/shop"
              className="inline-block px-6 md:px-8 py-3.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{
                backgroundColor: isLight ? "#1A1A2E" : "var(--accent)",
                color: isLight ? "#ffffff" : "#000000",
                border: isLight ? "1px solid #1A1A2E" : undefined,
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 600,
                letterSpacing: "0.15em",
              }}
            >
              Shop Collection
            </Link>
            <Link
              href="/about"
              className="inline-block px-6 md:px-8 py-3.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{
                border: isLight ? "1px solid rgba(26,26,46,0.5)" : "1px solid rgba(255,255,255,0.45)",
                color: isLight ? "#1A1A2E" : "rgba(255,255,255,0.85)",
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
          className="absolute right-6 md:right-12 bottom-8 md:bottom-20 hidden sm:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span
            className="text-[10px] tracking-widest uppercase rotate-90 origin-center"
            style={{ color: isLight ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.35)" }}
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
