import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CollectionClient from "./CollectionClient";

const VALID_SLUGS = ["flight-deck", "atc", "horizon", "altimeter"] as const;
type CollectionSlug = (typeof VALID_SLUGS)[number];

const COLLECTION_META: Record<CollectionSlug, { label: string; description: string }> = {
  "flight-deck": {
    label: "Flight Deck",
    description: "Outerwear and essentials built for life around the aircraft.",
  },
  atc: {
    label: "ATC",
    description: "Heavyweight fleece and structured knitwear for extended wear.",
  },
  horizon: {
    label: "Horizon",
    description: "Lightweight shells and bombers that define orientation in any condition.",
  },
  altimeter: {
    label: "Altimeter",
    description: "Precision-cut trousers and minimal accessories engineered for exact fit.",
  },
};

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const meta = COLLECTION_META[slug as CollectionSlug];
  if (!meta) return {};
  return {
    title: `${meta.label} Collection — Embedded`,
    description: meta.description,
    openGraph: {
      title: `${meta.label} Collection — Embedded`,
      description: meta.description,
    },
  };
}

function CollectionSkeleton() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="flex-1 pt-16 animate-pulse">
        <div style={{ minHeight: "42vh", backgroundColor: "var(--surface)" }} />
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <div className="mb-3" style={{ aspectRatio: "3/4", backgroundColor: "var(--surface)" }} />
                <div className="h-4 w-3/4 mb-2" style={{ backgroundColor: "var(--surface)" }} />
                <div className="h-3 w-1/2" style={{ backgroundColor: "var(--surface)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function CollectionPage({ params }: { params: Params }) {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug as CollectionSlug)) notFound();

  return (
    <Suspense fallback={<CollectionSkeleton />}>
      <CollectionClient slug={slug} />
    </Suspense>
  );
}
