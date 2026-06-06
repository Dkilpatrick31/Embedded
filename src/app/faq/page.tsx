import type { Metadata } from "next";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ — Embedded",
  description: "Frequently asked questions about Embedded aviation clothing — orders, sizing, products, and wholesale.",
  openGraph: {
    title: "FAQ — Embedded",
    description: "Answers to your questions about Embedded aviation clothing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Embedded",
    description: "Answers to your questions about Embedded aviation clothing.",
  },
};

export default function FaqPage() {
  return <FaqClient />;
}
