import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers — Embedded",
  description: "Join the Embedded crew. Open positions at the intersection of aviation culture and premium apparel.",
  openGraph: {
    title: "Careers — Embedded",
    description: "Join the Embedded crew. Open positions at the intersection of aviation culture and premium apparel.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers — Embedded",
    description: "Join the Embedded crew.",
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
