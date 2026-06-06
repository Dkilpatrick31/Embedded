import type { Metadata } from "next";
import WishlistClient from "./WishlistClient";

export const metadata: Metadata = {
  title: "Wishlist — Embedded",
  description: "Your saved Embedded pieces.",
  openGraph: {
    title: "Wishlist — Embedded",
    description: "Your saved Embedded pieces.",
  },
};

export default function WishlistPage() {
  return <WishlistClient />;
}
