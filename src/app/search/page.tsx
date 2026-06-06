import type { Metadata } from "next";
import { Suspense } from "react";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "Search — Embedded",
  description: "Search Embedded aviation pilot clothing by name, category, or collection.",
  openGraph: {
    title: "Search — Embedded",
    description: "Search Embedded aviation pilot clothing by name, category, or collection.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search — Embedded",
    description: "Search Embedded aviation pilot clothing by name, category, or collection.",
  },
};

export default function SearchPage() {
  return (
    <Suspense>
      <SearchClient />
    </Suspense>
  );
}
