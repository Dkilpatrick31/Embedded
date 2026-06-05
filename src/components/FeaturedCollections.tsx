"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const collections = [
  {
    id: 1,
    title: "Flight Deck",
    subtitle: "Outerwear",
    itemCount: 12,
    tag: "New",
    aspectRatio: "portrait",
    accentOpacity: "0.08",
  },
  {
    id: 2,
    title: "ATC",
    subtitle: "Knitwear",
    itemCount: 8,
    tag: null,
    aspectRatio: "landscape",
    accentOpacity: "0.05",
  },
  {
    id: 3,
    title: "Horizon",
    subtitle: "Trousers",
    itemCount: 10,
    tag: "Bestseller",
    aspectRatio: "portrait",
    accentOpacity: "0.06",
  },
  {
    id: 4,
    title: "Altimeter",
    subtitle: "Accessories",
    itemCount: 16,
    tag: null,
    aspectRatio: "square",
    accentOpacity: "0.04",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

function CollectionCard({ collection }: { collection: typeof collections[0] }) {
  const isWide = collection.aspectRatio === "landscape";

  return (
    <motion.div variants={itemVariants} className={isWide ? "lg:col-span-2" : ""}>
      <Link href={`/collections/${collection.title.toLowerCase().replace(" ", "-")}`} className="group block">
        {/* Image area */}
        <div
          className="relative overflow-hidden mb-4"
          style={{
            aspectRatio: isWide ? "16/9" : collection.aspectRatio === "square" ? "1/1" : "3/4",
            backgroundColor: "var(--surface)",
          }}
        >
          {/* Placeholder editorial content */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `radial-gradient(ellipse at center, rgba(200, 169, 110, ${collection.accentOpacity}) 0%, transparent 70%)`,
            }}
          />

          {/* Collection label watermark */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-10"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            <span
              className="text-5xl font-bold uppercase tracking-widest"
              style={{ color: "var(--text)" }}
            >
              {collection.title}
            </span>
          </div>

          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
          />

          {/* Tag */}
          {collection.tag && (
            <div
              className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-widest uppercase"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg)",
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 600,
              }}
            >
              {collection.tag}
            </div>
          )}

          {/* Quick shop on hover */}
          <div
            className="absolute bottom-4 left-4 right-4 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          >
            <span
              className="px-6 py-2.5 text-[10px] tracking-widest uppercase"
              style={{
                backgroundColor: "var(--bg)",
                color: "var(--text)",
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 600,
                letterSpacing: "0.15em",
              }}
            >
              View Collection
            </span>
          </div>
        </div>

        {/* Caption */}
        <div className="flex items-baseline justify-between">
          <div>
            <h3
              className="text-base font-semibold uppercase tracking-wider mb-0.5"
              style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
            >
              {collection.title}
            </h3>
            <p
              className="text-xs"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
            >
              {collection.subtitle}
            </p>
          </div>
          <span
            className="text-xs"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
          >
            {collection.itemCount} pieces
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedCollections() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
        <div>
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)" }}
          >
            Curated for Aviators
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold uppercase leading-none"
            style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
          >
            Featured
            <br />
            Collections
          </h2>
        </div>
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase transition-opacity hover:opacity-60 self-start md:self-auto"
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

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {collections.map((c) => (
          <CollectionCard key={c.id} collection={c} />
        ))}
      </motion.div>
    </section>
  );
}
