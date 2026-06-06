import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About — Embedded",
  description: "Founded by pilots, for pilots. The story behind Embedded aviation clothing.",
  openGraph: {
    title: "About — Embedded",
    description: "Founded by pilots, for pilots. The story behind Embedded aviation clothing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Embedded",
    description: "Founded by pilots, for pilots. The story behind Embedded aviation clothing.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
