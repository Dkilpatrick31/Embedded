"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// ── Lightning types ───────────────────────────────────────────────────────────

interface Bolt {
  path: [number, number][];
  maxOpacity: number;
  rgb: string;
  lineWidth: number;
  duration: number;
  startTime: number;
}

// ── Bolt factory ──────────────────────────────────────────────────────────────

function makeBolt(w: number, h: number, now: number): Bolt {
  const startX = w * (0.05 + Math.random() * 0.9);
  const segments = 5 + Math.floor(Math.random() * 6);
  const boltH = h * (0.2 + Math.random() * 0.45);
  const segH = boltH / segments;

  const path: [number, number][] = [[startX, -4]];
  let cx = startX;
  for (let i = 0; i < segments; i++) {
    cx = Math.max(8, Math.min(w - 8, cx + (Math.random() - 0.5) * w * 0.1));
    path.push([cx, (i + 1) * segH]);
  }

  const distant = Math.random() > 0.35;
  return {
    path,
    maxOpacity: distant ? 0.1 + Math.random() * 0.1 : 0.22 + Math.random() * 0.18,
    rgb: Math.random() > 0.4 ? "215,235,255" : "195,215,255",
    lineWidth: distant ? 0.4 + Math.random() * 0.7 : 1.0 + Math.random() * 1.8,
    duration: 320 + Math.random() * 280,
    startTime: now,
  };
}

// ── Canvas draw ───────────────────────────────────────────────────────────────

function drawBolt(ctx: CanvasRenderingContext2D, bolt: Bolt, opacity: number) {
  ctx.save();
  ctx.strokeStyle = `rgba(${bolt.rgb},${opacity})`;
  ctx.lineWidth = bolt.lineWidth;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.shadowColor = `rgba(${bolt.rgb},${opacity * 0.5})`;
  ctx.shadowBlur = bolt.lineWidth > 1 ? 12 : 6;

  ctx.beginPath();
  ctx.moveTo(bolt.path[0][0], bolt.path[0][1]);
  for (let i = 1; i < bolt.path.length; i++) {
    ctx.lineTo(bolt.path[i][0], bolt.path[i][1]);
  }
  ctx.stroke();
  ctx.restore();
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Resize canvas to match section ────────────────────────────────────────
    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── State ─────────────────────────────────────────────────────────────────
    const activeBolts: Bolt[] = [];
    const timers: ReturnType<typeof setTimeout>[] = [];
    let rafId: number;
    let alive = true;

    // ── Ambient flicker via direct DOM style ──────────────────────────────────
    const flicker = () => {
      section.style.filter = "brightness(1.08)";
      section.style.transition = "none";
      const t = setTimeout(() => {
        section.style.filter = "brightness(1)";
        section.style.transition = "filter 120ms ease";
      }, 55);
      timers.push(t);
    };

    // ── Schedule bolt strikes ─────────────────────────────────────────────────
    const schedule = () => {
      const delay = 2000 + Math.random() * 6000;
      const t = setTimeout(() => {
        if (!alive) return;

        // 25% chance of a cluster (2-4 bolts in quick succession)
        const count = Math.random() < 0.25 ? 2 + Math.floor(Math.random() * 3) : 1;
        for (let i = 0; i < count; i++) {
          const stagger = i * (80 + Math.random() * 140);
          const t2 = setTimeout(() => {
            if (!alive) return;
            activeBolts.push(makeBolt(canvas.width, canvas.height, performance.now()));
          }, stagger);
          timers.push(t2);
        }

        flicker();
        schedule();
      }, delay);
      timers.push(t);
    };
    schedule();

    // ── RAF loop ──────────────────────────────────────────────────────────────
    const loop = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Horizon glow — very slow sine pulse at the bottom
      const glowOpacity = ((Math.sin(now * 0.00045) + 1) / 2) * 0.055;
      const glow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height * 1.05, 20,
        canvas.width / 2, canvas.height * 1.05, canvas.width * 0.6
      );
      glow.addColorStop(0, `rgba(200,169,110,${glowOpacity})`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Active bolts — iterate in reverse so splice doesn't skip
      for (let i = activeBolts.length - 1; i >= 0; i--) {
        const bolt = activeBolts[i];
        const elapsed = now - bolt.startTime;
        if (elapsed >= bolt.duration) {
          activeBolts.splice(i, 1);
          continue;
        }
        // eased decay: fast at start, slow tail
        const t = elapsed / bolt.duration;
        const opacity = bolt.maxOpacity * Math.pow(1 - t, 1.4);
        drawBolt(ctx, bolt, opacity);
      }

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      alive = false;
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
      className="relative w-full h-screen min-h-[600px] flex items-end overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ backgroundColor: "var(--surface)" }}>
        {/* Grid overlay */}
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

        {/* Horizon motif */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-10">
          <div className="w-px h-32" style={{ backgroundColor: "var(--accent)" }} />
          <div className="w-24 h-px" style={{ backgroundColor: "var(--accent)" }} />
          <div className="w-px h-32" style={{ backgroundColor: "var(--accent)" }} />
        </div>

        {/* Altitude watermark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold leading-none select-none opacity-[0.03] whitespace-nowrap"
          style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
        >
          FL 410
        </div>
      </div>

      {/* Storm canvas — sits above the static bg, below the gradient */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Gradient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, var(--bg) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 lg:px-12 pb-16 md:pb-20">
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
            className="text-5xl md:text-6xl lg:text-8xl font-bold uppercase leading-none mb-6"
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

          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <Link
              href="/shop"
              className="inline-block px-6 md:px-8 py-3.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
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
              className="inline-block px-6 md:px-8 py-3.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
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
          className="absolute right-6 md:right-12 bottom-16 md:bottom-20 hidden sm:flex flex-col items-center gap-2"
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
