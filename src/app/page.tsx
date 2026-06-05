import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCollections from "@/components/FeaturedCollections";
import Footer from "@/components/Footer";

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
