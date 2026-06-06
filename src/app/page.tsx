import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCollections from "@/components/FeaturedCollections";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Embedded — Premium Aviation Pilot Clothing",
  description: "Precision-engineered garments for the cockpit and beyond. Where aviation heritage meets modern craft.",
  openGraph: {
    title: "Embedded — Premium Aviation Pilot Clothing",
    description: "Precision-engineered garments for the cockpit and beyond. Where aviation heritage meets modern craft.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Embedded — Premium Aviation Pilot Clothing",
    description: "Precision-engineered garments for the cockpit and beyond. Where aviation heritage meets modern craft.",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedCollections />
      </main>
      <Footer />
    </div>
  );
}
