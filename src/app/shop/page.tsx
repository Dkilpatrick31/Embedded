import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "./ShopClient";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Shop All — Embedded",
  description: "Browse the full Embedded collection. Precision-engineered aviation pilot clothing.",
  openGraph: {
    title: "Shop All — Embedded",
    description: "Browse the full Embedded collection. Precision-engineered aviation pilot clothing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop All — Embedded",
    description: "Browse the full Embedded collection. Precision-engineered aviation pilot clothing.",
  },
};

function ShopSkeleton() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="flex-1 pt-16 animate-pulse">
        <div
          className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-8 md:py-12"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="h-4 w-24 rounded mb-4" style={{ backgroundColor: "var(--surface)" }} />
          <div className="h-12 w-64 rounded" style={{ backgroundColor: "var(--surface)" }} />
        </div>
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <div className="mb-3 rounded" style={{ aspectRatio: "3/4", backgroundColor: "var(--surface)" }} />
                <div className="h-4 w-3/4 rounded mb-2" style={{ backgroundColor: "var(--surface)" }} />
                <div className="h-3 w-1/2 rounded" style={{ backgroundColor: "var(--surface)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<ShopSkeleton />}>
        <ShopClient />
      </Suspense>
    </ErrorBoundary>
  );
}
