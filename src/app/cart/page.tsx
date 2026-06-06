import type { Metadata } from "next";
import CartClient from "./CartClient";

export const metadata: Metadata = {
  title: "Your Bag — Embedded",
  description: "Review your selected items and proceed to checkout.",
  openGraph: {
    title: "Your Bag — Embedded",
    description: "Review your selected items and proceed to checkout.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Bag — Embedded",
    description: "Review your selected items and proceed to checkout.",
  },
};

export default function CartPage() {
  return <CartClient />;
}
