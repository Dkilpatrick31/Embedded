import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service — Embedded",
  description: "Embedded terms of service. Read the terms and conditions governing use of our website and purchases.",
  openGraph: {
    title: "Terms of Service — Embedded",
    description: "Embedded terms of service.",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service — Embedded",
    description: "Embedded terms of service.",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
