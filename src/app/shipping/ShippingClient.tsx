"use client";

import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Data ──────────────────────────────────────────────────────────────────────

const domesticRates = [
  { service: "Standard (5–7 business days)", rate: "Free on orders $150+", note: "$8.95 under $150" },
  { service: "Expedited (2–3 business days)", rate: "$18.00", note: "Order by 12pm PT" },
  { service: "Overnight (next business day)", rate: "$38.00", note: "Order by 12pm PT" },
];

const internationalRates = [
  { region: "Canada & Mexico", time: "7–14 business days", rate: "From $24.00" },
  { region: "Europe (EU)", time: "10–18 business days", rate: "From $32.00" },
  { region: "United Kingdom", time: "10–18 business days", rate: "From $30.00" },
  { region: "Asia-Pacific", time: "14–21 business days", rate: "From $38.00" },
  { region: "Rest of World", time: "14–28 business days", rate: "From $42.00" },
];

const returnSteps = [
  { step: "01", title: "Initiate", body: "Email hello@embeddedaviation.com within 30 days of delivery. Include your order number and reason for return." },
  { step: "02", title: "Label", body: "We'll send a prepaid return label within 1 business day. Print and attach it to your parcel." },
  { step: "03", title: "Ship", body: "Drop off at any carrier location. Keep your receipt and tracking number until your refund is confirmed." },
  { step: "04", title: "Refund", body: "Once we receive and inspect the item (typically 2–3 days), your refund is issued to the original payment method within 5–7 business days." },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ShippingClient() {
  const thStyle = {
    fontFamily: "var(--font-rajdhani)",
    color: "var(--text)",
    fontWeight: 700,
    fontSize: "0.65rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    padding: "12px 16px",
    textAlign: "left" as const,
    borderBottom: "1px solid var(--border)",
  };

  const tdStyle = {
    fontFamily: "var(--font-dm-sans)",
    color: "var(--text)",
    fontSize: "0.8rem",
    padding: "12px 16px",
    borderBottom: "1px solid var(--border)",
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
            Delivery & Returns
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold uppercase leading-none mb-4"
            style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
          >
            Shipping
          </h1>
          <p
            className="max-w-md text-sm leading-relaxed opacity-60"
            style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}
          >
            Free domestic shipping on orders over $150. 30-day returns, no questions asked.
          </p>
        </section>

        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
          {/* ── Domestic ── */}
          <section aria-labelledby="domestic-heading" className="mb-16">
            <h2
              id="domestic-heading"
              className="text-2xl font-bold uppercase mb-6"
              style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
            >
              Domestic Shipping (USA)
            </h2>
            <div className="overflow-x-auto" style={{ border: "1px solid var(--border)" }}>
              <table className="w-full min-w-[400px]" style={{ borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "var(--surface)" }}>
                  <tr>
                    <th style={thStyle}>Service</th>
                    <th style={thStyle}>Rate</th>
                    <th style={thStyle}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {domesticRates.map((row, i) => (
                    <tr key={row.service} style={{ backgroundColor: i % 2 === 0 ? "transparent" : "var(--surface)" }}>
                      <td style={tdStyle}>{row.service}</td>
                      <td style={{ ...tdStyle, color: "var(--accent)", fontWeight: 700 }}>{row.rate}</td>
                      <td style={{ ...tdStyle, color: "var(--text-muted)" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3 opacity-50" style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}>
              Orders placed before 12pm PT Mon–Fri ship same day. Orders placed after cutoff or on weekends ship the next business day.
            </p>
          </section>

          {/* ── International ── */}
          <section aria-labelledby="international-heading" className="mb-16">
            <h2
              id="international-heading"
              className="text-2xl font-bold uppercase mb-6"
              style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
            >
              International Shipping
            </h2>
            <div className="overflow-x-auto" style={{ border: "1px solid var(--border)" }}>
              <table className="w-full min-w-[400px]" style={{ borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "var(--surface)" }}>
                  <tr>
                    <th style={thStyle}>Region</th>
                    <th style={thStyle}>Estimated Delivery</th>
                    <th style={thStyle}>Starting From</th>
                  </tr>
                </thead>
                <tbody>
                  {internationalRates.map((row, i) => (
                    <tr key={row.region} style={{ backgroundColor: i % 2 === 0 ? "transparent" : "var(--surface)" }}>
                      <td style={tdStyle}>{row.region}</td>
                      <td style={{ ...tdStyle, color: "var(--text-muted)" }}>{row.time}</td>
                      <td style={{ ...tdStyle, color: "var(--accent)", fontWeight: 700 }}>{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3 opacity-50" style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}>
              International customers are responsible for any import duties, taxes, or customs fees imposed by the destination country. These are not included in our shipping rates.
            </p>
          </section>

          {/* ── Returns ── */}
          <section aria-labelledby="returns-heading" className="mb-16">
            <h2
              id="returns-heading"
              className="text-2xl font-bold uppercase mb-2"
              style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
            >
              Returns Policy
            </h2>
            <p className="text-sm mb-10 opacity-60" style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}>
              We accept returns within <strong style={{ color: "var(--text)", opacity: 1 }}>30 days</strong> of delivery for unworn, unwashed items with original tags attached. Sale items and final-sale pieces are non-returnable.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {returnSteps.map((s) => (
                <div key={s.step} className="p-6" style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}>
                  <span
                    className="block text-4xl font-bold leading-none mb-4"
                    style={{ fontFamily: "var(--font-rajdhani)", color: "var(--accent)", opacity: 0.4 }}
                    aria-hidden="true"
                  >
                    {s.step}
                  </span>
                  <h3
                    className="text-sm font-bold uppercase mb-2 tracking-wider"
                    style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Questions CTA ── */}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-6 p-10"
            style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}
          >
            <div>
              <h3
                className="text-xl font-bold uppercase mb-1"
                style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
              >
                Questions About Your Order?
              </h3>
              <p className="text-sm opacity-60" style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}>
                Our support team responds within 24–48 hours.
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
