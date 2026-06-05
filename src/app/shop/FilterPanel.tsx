"use client";

import { useState } from "react";
import { CATEGORIES, COLLECTIONS, FILTER_SIZES, PRICE_RANGES } from "@/lib/products";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5"
      className="transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: "1px solid var(--border)" }} className="py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between cursor-pointer"
        style={{ color: "var(--text)" }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700, letterSpacing: "0.15em" }}
        >
          {title}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

interface FilterPanelProps {
  selectedCategories: string[];
  selectedCollections: string[];
  selectedSizes: string[];
  selectedPrice: string | null;
  activeCount: number;
  onToggle: (key: "category" | "collection" | "size", value: string) => void;
  onPriceSelect: (value: string | null) => void;
  onClearAll: () => void;
}

export default function FilterPanel({
  selectedCategories,
  selectedCollections,
  selectedSizes,
  selectedPrice,
  activeCount,
  onToggle,
  onPriceSelect,
  onClearAll,
}: FilterPanelProps) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700, color: "var(--text)", letterSpacing: "0.2em" }}
        >
          Filters
        </span>
        {activeCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs tracking-wider uppercase transition-opacity hover:opacity-100 opacity-50 cursor-pointer"
            style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <Section title="Category">
        <div className="flex flex-col gap-2.5">
          {CATEGORIES.map((cat) => {
            const active = selectedCategories.includes(cat);
            return (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <span
                  className="w-4 h-4 flex-shrink-0 flex items-center justify-center border transition-colors"
                  style={{
                    borderColor: active ? "var(--accent)" : "var(--border)",
                    backgroundColor: active ? "var(--accent)" : "transparent",
                  }}
                >
                  {active && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={active}
                  onChange={() => onToggle("category", cat)}
                />
                <span
                  className="text-xs tracking-wide transition-opacity"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    color: "var(--text)",
                    opacity: active ? 1 : 0.6,
                  }}
                >
                  {cat}
                </span>
              </label>
            );
          })}
        </div>
      </Section>

      {/* Collection */}
      <Section title="Collection">
        <div className="flex flex-col gap-2.5">
          {COLLECTIONS.map((col) => {
            const active = selectedCollections.includes(col.id);
            return (
              <label key={col.id} className="flex items-center gap-3 cursor-pointer">
                <span
                  className="w-4 h-4 flex-shrink-0 flex items-center justify-center border transition-colors"
                  style={{
                    borderColor: active ? "var(--accent)" : "var(--border)",
                    backgroundColor: active ? "var(--accent)" : "transparent",
                  }}
                >
                  {active && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={active}
                  onChange={() => onToggle("collection", col.id)}
                />
                <span
                  className="text-xs tracking-wide transition-opacity"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    color: "var(--text)",
                    opacity: active ? 1 : 0.6,
                  }}
                >
                  {col.label}
                </span>
              </label>
            );
          })}
        </div>
      </Section>

      {/* Size */}
      <Section title="Size">
        <div className="flex flex-wrap gap-2">
          {FILTER_SIZES.map((size) => {
            const active = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => onToggle("size", size)}
                className="px-3 py-1.5 text-[11px] tracking-wider uppercase transition-colors cursor-pointer"
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 600,
                  border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                  color: active ? "var(--accent)" : "var(--text)",
                  opacity: active ? 1 : 0.6,
                  backgroundColor: "transparent",
                }}
              >
                {size}
              </button>
            );
          })}
        </div>
      </Section>

      {/* Price */}
      <Section title="Price">
        <div className="flex flex-col gap-2.5">
          {PRICE_RANGES.map((range) => {
            const active = selectedPrice === range.id;
            return (
              <label key={range.id} className="flex items-center gap-3 cursor-pointer">
                <span
                  className="w-4 h-4 flex-shrink-0 rounded-full border flex items-center justify-center transition-colors"
                  style={{
                    borderColor: active ? "var(--accent)" : "var(--border)",
                  }}
                >
                  {active && (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "var(--accent)" }}
                    />
                  )}
                </span>
                <input
                  type="radio"
                  className="sr-only"
                  checked={active}
                  onChange={() => onPriceSelect(active ? null : range.id)}
                />
                <span
                  className="text-xs tracking-wide"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    color: "var(--text)",
                    opacity: active ? 1 : 0.6,
                  }}
                >
                  {range.label}
                </span>
              </label>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
