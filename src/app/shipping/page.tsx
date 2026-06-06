import type { Metadata } from "next";
import ShippingClient from "./ShippingClient";

export const metadata: Metadata = {
  title: "Shipping & Returns — Embedded",
  description: "Embedded shipping rates, delivery times, and returns policy. Free domestic shipping on orders over $150.",
  openGraph: {
    title: "Shipping & Returns — Embedded",
    description: "Shipping rates, delivery times, and returns policy for Embedded aviation clothing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping & Returns — Embedded",
    description: "Shipping rates, delivery times, and returns policy.",
  },
};

export default function ShippingPage() {
  return <ShippingClient />;
}
