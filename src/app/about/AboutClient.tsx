"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Shared animation variants ─────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const viewOpts = { once: true, margin: "-80px" };

// ── Section 1: Hero ───────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: "var(--surface)" }}>
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="about-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-grid)" />
          </svg>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-[0.08]">
          <div className="w-px h-40" style={{ backgroundColor: "var(--accent)" }} />
          <div className="w-32 h-px" style={{ backgroundColor: "var(--accent)" }} />
          <div className="w-px h-40" style={{ backgroundColor: "var(--accent)" }} />
        </div>

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold leading-none select-none opacity-[0.03] whitespace-nowrap"
          style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)", fontSize: "clamp(80px, 22vw, 320px)" }}
        >
          EMBEDDED
        </div>
      </div>

      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 40%, transparent 60%, var(--bg) 100%)" }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-xs tracking-[0.35em] uppercase mb-6"
            style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
          >
            Our Story
          </motion.p>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-none mb-6"
            style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
          >
            Built for the
            <br />
            Flight Line
          </h1>

          <p
            className="text-sm md:text-base leading-relaxed mx-auto max-w-lg"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
          >
            Where aviation heritage meets modern craft.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--text-muted)", fontFamily: "var(--font-rajdhani)" }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-10"
          style={{ backgroundColor: "var(--accent)" }}
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

// ── Section 2: Brand Statement ────────────────────────────────────────────────

function BrandStatementSection() {
  return (
    <section className="py-24 md:py-36">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewOpts}
        className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-6"
      >
        <motion.div variants={fadeIn} className="w-12 h-px" style={{ backgroundColor: "var(--accent)" }} />

        <motion.blockquote variants={fadeUp}>
          <p
            className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase leading-snug"
            style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
          >
            "We don't make clothes for people who fly.
            <br className="hidden sm:block" />
            We make clothes{" "}
            <span style={{ color: "var(--accent)" }}>by</span>
            {" "}people who fly."
          </p>
        </motion.blockquote>

        <motion.div variants={fadeIn} className="w-12 h-px" style={{ backgroundColor: "var(--accent)" }} />
      </motion.div>
    </section>
  );
}

// ── Section 3: Three Values ───────────────────────────────────────────────────

const VALUES = [
  { number: "01", title: "Precision", body: "Every stitch engineered to perform at altitude and on the ground. No excess. No compromise." },
  { number: "02", title: "Heritage", body: "Rooted in aviation culture, inspired by the men and women of the flight line across every era." },
  { number: "03", title: "Function", body: "Garments designed for real movement, real conditions, real pilots — not the fashion runway." },
] as const;

function ValuesSection() {
  return (
    <section className="py-24 md:py-32" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewOpts} className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}>
            What We Stand For
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewOpts}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16"
        >
          {VALUES.map((value) => (
            <motion.div key={value.number} variants={fadeUp}>
              <p className="text-7xl lg:text-8xl font-bold leading-none mb-4 select-none" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--accent)", opacity: 0.35 }}>
                {value.number}
              </p>
              <div className="w-8 h-px mb-5" style={{ backgroundColor: "var(--border)" }} />
              <h3 className="text-xl font-bold uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)", letterSpacing: "0.15em" }}>
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}>
                {value.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Section 4: Brand Story ────────────────────────────────────────────────────

const STORY_PARAGRAPHS = [
  "Embedded was founded by pilots, for pilots. We got tired of choosing between clothes that looked good and clothes that worked. The culture of aviation deserved better — so we built it.",
  "Every piece starts with a real problem we've faced at the ramp, in the cockpit, or on the walk-around. The collar that catches a headset. The sleeve that rides up under a harness. The fabric that makes you sweat on a summer preflight. We design for actual conditions, not imagined ones.",
  "Our manufacturing runs are small by design. We work with a select group of specialist factories where every cut and seam is held to the same standard we'd apply to a pre-flight check. No shortcuts. No compromises on material. No excuse for ordinary.",
  "Embedded is not fashion for pilots. It's a uniform for the culture — built with the same precision, the same discipline, and the same respect for the craft that every aviator brings to the cockpit.",
];

function BrandStorySection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewOpts}
            className="relative overflow-hidden"
            style={{ aspectRatio: "4/5", backgroundColor: "var(--surface)" }}
          >
            <div className="absolute inset-0 opacity-[0.04]">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="story-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#story-grid)" />
              </svg>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-[0.07]">
              <div className="w-px h-24" style={{ backgroundColor: "var(--accent)" }} />
              <div className="w-20 h-px" style={{ backgroundColor: "var(--accent)" }} />
              <div className="w-px h-24" style={{ backgroundColor: "var(--accent)" }} />
            </div>
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 40% 60%, rgba(200,169,110,0.07) 0%, transparent 65%)" }} />
            <div className="absolute inset-0 flex items-center justify-center select-none" style={{ fontFamily: "var(--font-rajdhani)" }}>
              <span className="text-[clamp(48px,8vw,96px)] font-bold uppercase tracking-widest opacity-[0.06]" style={{ color: "var(--text)" }}>
                EST.<br />2024
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[10px] tracking-[0.3em] uppercase opacity-30" style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}>
                Embedded HQ — 2024
              </p>
            </div>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewOpts} className="flex flex-col gap-6 lg:pt-4">
            <motion.div variants={fadeUp}>
              <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}>
                Founded 2024
              </p>
              <h2 className="text-3xl md:text-4xl font-bold uppercase leading-tight" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}>
                Founded on<br />the Flight Line
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} className="w-10 h-px" style={{ backgroundColor: "var(--accent)" }} />
            {STORY_PARAGRAPHS.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-sm leading-relaxed"
                style={{ color: i === 0 ? "var(--text)" : "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
              >
                {para}
              </motion.p>
            ))}
            <motion.div variants={fadeUp} className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
                style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)", fontWeight: 700, letterSpacing: "0.15em" }}
              >
                Shop the Collection
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Section 5: Editorial Banner ───────────────────────────────────────────────

function EditorialBannerSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "var(--surface)" }}>
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="banner-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#banner-grid)" />
        </svg>
      </div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold leading-none select-none whitespace-nowrap opacity-[0.025]"
        style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)", fontSize: "clamp(60px, 18vw, 240px)" }}
      >
        TAKEOFF
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--surface) 0%, transparent 20%, transparent 80%, var(--surface) 100%)" }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewOpts}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 md:py-40 gap-6"
      >
        <motion.p variants={fadeUp} className="text-xs tracking-[0.35em] uppercase" style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}>
          Spring / Summer 2025
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-none" style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}>
          Cleared for<br />Takeoff
        </motion.h2>
        <motion.p variants={fadeUp} className="text-sm max-w-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}>
          Explore the latest collection
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link
            href="/shop"
            className="inline-block px-10 py-4 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
            style={{ backgroundColor: "var(--accent)", color: "var(--bg)", fontFamily: "var(--font-rajdhani)", fontWeight: 700, letterSpacing: "0.2em" }}
          >
            Shop Now
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutClient() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1 pt-16">
        <HeroSection />
        <BrandStatementSection />
        <ValuesSection />
        <BrandStorySection />
        <EditorialBannerSection />
      </main>
      <Footer />
    </div>
    </MotionConfig>
  );
}
