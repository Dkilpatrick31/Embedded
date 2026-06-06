"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Bolt {
  path: [number, number][];
  branches: Array<{ path: [number, number][]; widthMult: number }>;
  maxOpacity: number;
  lineWidth: number;
  duration: number;
  startTime: number;
  originX: number;
  originY: number;
}

interface Rumble {
  x: number;
  y: number;
  startTime: number;
}

const RUMBLE_DURATION = 800;

// ── Bolt factory ──────────────────────────────────────────────────────────────

function makeBolt(w: number, h: number, now: number): Bolt {
  const startX = w * (0.05 + Math.random() * 0.9);
  const segments = 6 + Math.floor(Math.random() * 5);
  const boltH = h * (0.3 + Math.random() * 0.55);
  const segH = boltH / segments;

  const path: [number, number][] = [[startX, -4]];
  let cx = startX;
  for (let i = 0; i < segments; i++) {
    cx = Math.max(8, Math.min(w - 8, cx + (Math.random() - 0.5) * w * 0.12));
    path.push([cx, (i + 1) * segH]);
  }

  // 1-2 branch bolts splitting off the main path
  const numBranches = 1 + Math.floor(Math.random() * 2);
  const branches: Bolt["branches"] = [];
  for (let b = 0; b < numBranches; b++) {
    const branchIdx = 2 + Math.floor(Math.random() * Math.max(1, path.length - 4));
    const [bx, by] = path[branchIdx];
    const branchSegs = 3 + Math.floor(Math.random() * 3);
    const branchPath: [number, number][] = [[bx, by]];
    let bcx = bx;
    const dir = Math.random() > 0.5 ? 1 : -1;
    for (let i = 0; i < branchSegs; i++) {
      bcx = Math.max(8, Math.min(w - 8, bcx + dir * (18 + Math.random() * 28) + (Math.random() - 0.5) * 16));
      branchPath.push([bcx, by + (i + 1) * (segH * 0.75)]);
    }
    branches.push({ path: branchPath, widthMult: 0.35 + Math.random() * 0.3 });
  }

  const midIdx = Math.floor(path.length / 2);

  return {
    path,
    branches,
    maxOpacity: 0.3 + Math.random() * 0.4,
    lineWidth: 1.2 + Math.random() * 2.4,
    duration: 260 + Math.random() * 320,
    startTime: now,
    originX: startX,
    originY: path[midIdx][1],
  };
}

// ── Draw helpers ──────────────────────────────────────────────────────────────

function strokeSegments(ctx: CanvasRenderingContext2D, path: [number, number][], lw: number) {
  ctx.lineWidth = lw;
  ctx.shadowBlur = lw > 2 ? 18 : 10;
  ctx.beginPath();
  ctx.moveTo(path[0][0], path[0][1]);
  for (let i = 1; i < path.length; i++) ctx.lineTo(path[i][0], path[i][1]);
  ctx.stroke();
}

function drawBolt(ctx: CanvasRenderingContext2D, bolt: Bolt, opacity: number) {
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = `rgba(200,220,255,${opacity})`;
  ctx.shadowColor = `rgba(200,220,255,${opacity * 0.65})`;
  strokeSegments(ctx, bolt.path, bolt.lineWidth);

  for (const branch of bolt.branches) {
    ctx.strokeStyle = `rgba(200,220,255,${opacity * 0.6})`;
    ctx.shadowColor = `rgba(200,220,255,${opacity * 0.3})`;
    strokeSegments(ctx, branch.path, bolt.lineWidth * branch.widthMult);
  }
  ctx.restore();
}

function drawRumble(ctx: CanvasRenderingContext2D, rumble: Rumble, now: number): boolean {
  const elapsed = now - rumble.startTime;
  if (elapsed >= RUMBLE_DURATION) return false;
  const t = elapsed / RUMBLE_DURATION;
  const radius = t * 300;
  const opacity = 0.08 * (1 - t);
  const innerR = Math.max(0, radius - 50);

  ctx.save();
  const grd = ctx.createRadialGradient(rumble.x, rumble.y, innerR, rumble.x, rumble.y, radius);
  grd.addColorStop(0, `rgba(255,255,255,${opacity})`);
  grd.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(rumble.x, rumble.y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  return true;
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

    // ── Resize ────────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── State ─────────────────────────────────────────────────────────────────
    const activeBolts: Bolt[] = [];
    const activeRumbles: Rumble[] = [];
    const timers: ReturnType<typeof setTimeout>[] = [];
    let rafId: number;
    let mounted = true;

    // ── Flicker ───────────────────────────────────────────────────────────────
    const flicker = () => {
      section.style.filter = "brightness(1.15)";
      section.style.transition = "none";
      const t = setTimeout(() => {
        section.style.filter = "brightness(1)";
        section.style.transition = "filter 100ms ease";
      }, 60);
      timers.push(t);
    };

    // ── Strike: fire a cluster of 3-6 bolts ───────────────────────────────────
    const strike = () => {
      const count = 3 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) {
        const stagger = i * (45 + Math.random() * 110);
        const t = setTimeout(() => {
          if (!mounted) return;
          const bolt = makeBolt(canvas.width, canvas.height, performance.now());
          activeBolts.push(bolt);
          // Thunder rumble after brief delay
          const t2 = setTimeout(() => {
            if (!mounted) return;
            activeRumbles.push({ x: bolt.originX, y: bolt.originY, startTime: performance.now() });
          }, 120 + Math.random() * 280);
          timers.push(t2);
        }, stagger);
        timers.push(t);
      }
      flicker();
    };

    // ── Schedule: 1-4 seconds between strikes ─────────────────────────────────
    const schedule = () => {
      const delay = 1000 + Math.random() * 3000;
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

      // Thunder rumbles (drawn first — they sit below bolts)
      for (let i = activeRumbles.length - 1; i >= 0; i--) {
        if (!drawRumble(ctx, activeRumbles[i], now)) activeRumbles.splice(i, 1);
      }

      // Lightning bolts
      for (let i = activeBolts.length - 1; i >= 0; i--) {
        const bolt = activeBolts[i];
        const elapsed = now - bolt.startTime;
        if (elapsed >= bolt.duration) { activeBolts.splice(i, 1); continue; }
        const opacity = bolt.maxOpacity * Math.pow(1 - elapsed / bolt.duration, 1.3);
        drawBolt(ctx, bolt, opacity);
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
      className="relative w-full h-screen min-h-[600px] flex items-end overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Layer 2: Lightning canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Layer 3: Logo — centered atmospheric watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <Image
          src="/Embedded-Logo.jpeg"
          alt=""
          width={1254}
          height={1254}
          className="w-[220px] md:w-[320px] h-auto"
          style={{ opacity: 0.40 }}
          priority
        />
      </div>

      {/* Layer 4: Vignette — dark edges, bottom fade to black */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.15) 38%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 28%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Layer 5: Content */}
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
            style={{ fontFamily: "var(--font-rajdhani)", color: "#ffffff" }}
          >
            Above
            <br />
            The Line
          </h1>

          <p
            className="text-sm leading-relaxed mb-8 max-w-md"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-dm-sans)" }}
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
                color: "#000000",
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
                border: "1px solid rgba(255,255,255,0.45)",
                color: "rgba(255,255,255,0.85)",
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
            style={{ color: "rgba(255,255,255,0.35)" }}
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
