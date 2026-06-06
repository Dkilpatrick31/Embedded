import type { Metadata } from "next";
import SizeGuideClient from "./SizeGuideClient";

export const metadata: Metadata = {
  title: "Size Guide — Embedded",
  description: "Find your perfect fit with the Embedded size guide. Men's and women's sizing charts for all aviation apparel.",
  openGraph: {
    title: "Size Guide — Embedded",
    description: "Find your perfect fit with the Embedded size guide.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Size Guide — Embedded",
    description: "Find your perfect fit with the Embedded size guide.",
  },
};

export default function SizeGuidePage() {
  return <SizeGuideClient />;
}
