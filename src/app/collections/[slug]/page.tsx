import { notFound } from "next/navigation";
import { Suspense } from "react";
import CollectionClient from "./CollectionClient";

const VALID_SLUGS = ["flight-deck", "atc", "horizon", "altimeter"] as const;
type CollectionSlug = (typeof VALID_SLUGS)[number];

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
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
                <div
                  className="mb-3"
                  style={{ aspectRatio: "3/4", backgroundColor: "var(--surface)" }}
                />
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

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug as CollectionSlug)) notFound();

  return (
    <Suspense fallback={<CollectionSkeleton />}>
      <CollectionClient slug={slug} />
    </Suspense>
  );
}
