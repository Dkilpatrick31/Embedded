"use client";

import { useState } from "react";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Data ──────────────────────────────────────────────────────────────────────

type FaqItem = { q: string; a: string };
type FaqCategory = { id: string; label: string; items: FaqItem[] };

const categories: FaqCategory[] = [
  {
    id: "orders",
    label: "Orders",
    items: [
      {
        q: "How do I track my order?",
        a: "Once your order ships, you'll receive a confirmation email with a tracking number. Use it on the carrier's website for real-time updates. Tracking typically activates within 24 hours of dispatch.",
      },
      {
        q: "Can I modify or cancel my order?",
        a: "Orders can be modified or cancelled within 1 hour of placement. After that, our fulfillment team has already begun processing. Email hello@embeddedaviation.com immediately and we'll do our best.",
      },
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery for unworn, unwashed items with original tags attached. Sale items are final sale. Initiate a return via our contact form and we'll send a prepaid label.",
      },
      {
        q: "Do you offer exchanges?",
        a: "Yes. The fastest way is to return your item and place a new order. We'll expedite processing and waive the shipping fee on the replacement when you reference your original order number.",
      },
      {
        q: "My order arrived damaged. What do I do?",
        a: "We're sorry to hear that. Email us within 7 days of delivery with photos of the damage and your order number. We'll send a replacement at no cost or issue a full refund — your choice.",
      },
    ],
  },
  {
    id: "sizing",
    label: "Sizing",
    items: [
      {
        q: "How do your sizes run?",
        a: "Embedded garments are true-to-size with a tailored, performance-focused cut. If you prefer a more relaxed fit or are between sizes, we recommend sizing up. Check our full size chart on the Size Guide page.",
      },
      {
        q: "Where can I find the size chart?",
        a: "Our detailed men's and women's size charts are on the Size Guide page. Each listing also includes specific garment measurements in the product details.",
      },
      {
        q: "Do you offer extended sizing?",
        a: "Currently we offer sizes XS–3XL in most styles. We're actively working on expanding our size range. Sign up for our newsletter to be notified when extended sizes drop.",
      },
      {
        q: "Can I return an item if it doesn't fit?",
        a: "Absolutely. Size-related returns are accepted within 30 days with original tags intact. We offer free return shipping on first-time size exchanges per order.",
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    items: [
      {
        q: "What materials do you use?",
        a: "We source premium technical fabrics — mostly 100% GOTS-certified organic cotton for casual wear, and proprietary performance blends for our aviation-specific apparel. Full material composition is listed on each product page.",
      },
      {
        q: "How should I care for my garments?",
        a: "Machine wash cold with like colors, gentle cycle. Tumble dry low or hang dry. Do not bleach. Iron on low. Specific care instructions are on each garment's label and product page.",
      },
      {
        q: "Will sold-out items come back in stock?",
        a: "Many items are restocked seasonally. Use the 'Notify Me' button on sold-out product pages to get an email the moment a size returns. Limited-run and collab pieces are typically not restocked.",
      },
      {
        q: "Do you offer customization or embroidery?",
        a: "We offer limited embroidery services for wholesale and group orders (10+ units). Contact us for details. Individual customization is not available at this time.",
      },
    ],
  },
  {
    id: "wholesale",
    label: "Wholesale",
    items: [
      {
        q: "Do you offer wholesale pricing?",
        a: "Yes. We work with select aviation clubs, FBOs, flight schools, and retailers. Minimum order quantities and tiered pricing apply. Reach out via our Contact page and select 'Wholesale' as the subject.",
      },
      {
        q: "What is the minimum order quantity?",
        a: "Standard wholesale orders start at 24 units per style/colorway. Custom embroidered orders have a minimum of 48 units. We can accommodate smaller pilot orders — contact us to discuss.",
      },
      {
        q: "Can we get our logo on the products?",
        a: "Yes. Embroidered or screen-printed co-branding is available on qualifying wholesale orders. We require vector artwork files. Lead time is 6–8 weeks from art approval.",
      },
      {
        q: "How do I apply for a wholesale account?",
        a: "Send us a message through the Contact page selecting 'Wholesale.' Include your business name, type, estimated volume, and a brief description of your operation. Our wholesale team responds within 3 business days.",
      },
    ],
  },
];

// ── Accordion item ────────────────────────────────────────────────────────────

function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: "1px solid var(--border)" }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left transition-opacity hover:opacity-80"
        aria-expanded={isOpen}
      >
        <span
          className="text-sm font-medium"
          style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}
        >
          {item.q}
        </span>
        <span
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            color: "var(--accent)",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? "400px" : "0px" }}
        aria-hidden={!isOpen}
      >
        <p
          className="pb-5 text-sm leading-relaxed"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FaqClient() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleCategoryChange = (idx: number) => {
    setActiveCategory(idx);
    setOpenIndex(null);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <AnnouncementBar />
      <Navbar />

      <main id="main-content">
        {/* ── Hero ── */}
        <section
          className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-36"
          style={{ backgroundColor: "var(--surface)", borderBottom: "1px solid var(--border)" }}
        >
          <p
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)" }}
          >
            Knowledge Base
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold uppercase leading-none mb-4"
            style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
          >
            FAQ
          </h1>
          <p
            className="max-w-md text-sm leading-relaxed opacity-60"
            style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}
          >
            Everything you need to know. Can&apos;t find your answer?{" "}
            <Link href="/contact" className="underline underline-offset-2 hover:opacity-80" style={{ color: "var(--accent)" }}>
              Contact us
            </Link>
            .
          </p>
        </section>

        {/* ── Content ── */}
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Category nav */}
            <nav aria-label="FAQ categories" className="lg:w-56 flex-shrink-0">
              <ul className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                {categories.map((cat, idx) => (
                  <li key={cat.id}>
                    <button
                      id={cat.id}
                      onClick={() => handleCategoryChange(idx)}
                      className="whitespace-nowrap px-5 py-3 text-xs tracking-widest uppercase transition-all w-full text-left"
                      style={{
                        fontFamily: "var(--font-rajdhani)",
                        fontWeight: 700,
                        backgroundColor: activeCategory === idx ? "var(--accent)" : "transparent",
                        color: activeCategory === idx ? "var(--bg)" : "var(--text)",
                        border: "1px solid",
                        borderColor: activeCategory === idx ? "var(--accent)" : "var(--border)",
                      }}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Accordion */}
            <div className="flex-1">
              <h2
                className="text-3xl font-bold uppercase mb-8"
                style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
              >
                {categories[activeCategory].label}
              </h2>
              <div style={{ borderTop: "1px solid var(--border)" }}>
                {categories[activeCategory].items.map((item, idx) => (
                  <AccordionItem
                    key={item.q}
                    item={item}
                    isOpen={openIndex === idx}
                    onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Still need help */}
          <div
            className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 p-10"
            style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}
          >
            <div>
              <h3
                className="text-2xl font-bold uppercase mb-2"
                style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
              >
                Still Have Questions?
              </h3>
              <p className="text-sm opacity-60" style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}>
                Our team responds within 24–48 hours.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 px-8 py-4 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg)",
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 700,
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
