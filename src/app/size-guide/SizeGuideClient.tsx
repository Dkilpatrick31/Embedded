"use client";

import { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Data ──────────────────────────────────────────────────────────────────────

type SizeRow = { size: string; chest: string; waist: string; hips: string; inseam?: string };

const mensSizes: SizeRow[] = [
  { size: "XS",  chest: "33–35\"", waist: "27–29\"", hips: "34–36\"", inseam: "30\"" },
  { size: "S",   chest: "35–37\"", waist: "29–31\"", hips: "36–38\"", inseam: "31\"" },
  { size: "M",   chest: "38–40\"", waist: "32–34\"", hips: "39–41\"", inseam: "32\"" },
  { size: "L",   chest: "41–43\"", waist: "35–37\"", hips: "42–44\"", inseam: "32\"" },
  { size: "XL",  chest: "44–46\"", waist: "38–40\"", hips: "45–47\"", inseam: "33\"" },
  { size: "2XL", chest: "47–49\"", waist: "41–43\"", hips: "48–50\"", inseam: "33\"" },
  { size: "3XL", chest: "50–53\"", waist: "44–47\"", hips: "51–54\"", inseam: "34\"" },
];

const womensSizes: SizeRow[] = [
  { size: "XS",  chest: "30–32\"", waist: "23–25\"", hips: "33–35\"" },
  { size: "S",   chest: "33–34\"", waist: "26–27\"", hips: "36–37\"" },
  { size: "M",   chest: "35–36\"", waist: "28–29\"", hips: "38–39\"" },
  { size: "L",   chest: "37–39\"", waist: "30–32\"", hips: "40–42\"" },
  { size: "XL",  chest: "40–42\"", waist: "33–35\"", hips: "43–45\"" },
  { size: "2XL", chest: "43–45\"", waist: "36–38\"", hips: "46–48\"" },
  { size: "3XL", chest: "46–49\"", waist: "39–42\"", hips: "49–52\"" },
];

const fitNotes = [
  {
    label: "Flight Jacket",
    note: "Designed for layering over a base layer. We recommend sizing up if you plan to wear over a hoodie or crew neck.",
  },
  {
    label: "Performance Tee",
    note: "Slim, athletic cut. True-to-size. Size up for a relaxed fit.",
  },
  {
    label: "Cargo Trousers",
    note: "Relaxed through the thigh, tapered below the knee. True-to-size. Inseam on all lengths is 32\" unfinished.",
  },
  {
    label: "Crew Neck Fleece",
    note: "Oversized silhouette by design. Size down if you prefer a structured fit.",
  },
];

// ── Measurement guide ─────────────────────────────────────────────────────────

const measurements = [
  { label: "Chest", how: "Measure around the fullest part of your chest, keeping the tape horizontal." },
  { label: "Waist", how: "Measure around your natural waistline, an inch above your navel." },
  { label: "Hips", how: "Measure around the fullest part of your hips and seat." },
  { label: "Inseam", how: "Measure from the crotch seam to the bottom of your ankle." },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SizeGuideClient() {
  const [gender, setGender] = useState<"men" | "women">("men");

  const sizes = gender === "men" ? mensSizes : womensSizes;
  const showInseam = gender === "men";

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

  const tdStyle = (highlight: boolean) => ({
    fontFamily: "var(--font-dm-sans)",
    color: highlight ? "var(--accent)" : "var(--text)",
    fontSize: "0.8rem",
    padding: "12px 16px",
    borderBottom: "1px solid var(--border)",
    fontWeight: highlight ? 700 : 400,
  });

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
            Fit Guide
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold uppercase leading-none mb-4"
            style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
          >
            Size Guide
          </h1>
          <p
            className="max-w-md text-sm leading-relaxed opacity-60"
            style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}
          >
            All measurements are in inches. When in doubt, size up — our garments are designed to accommodate layering.
          </p>
        </section>

        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
          {/* ── Toggle ── */}
          <div className="flex gap-0 mb-12 w-fit" role="group" aria-label="Select gender sizing">
            {(["men", "women"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className="px-8 py-3 text-xs tracking-widest uppercase transition-all"
                style={{
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 700,
                  backgroundColor: gender === g ? "var(--accent)" : "transparent",
                  color: gender === g ? "var(--bg)" : "var(--text)",
                  border: "1px solid",
                  borderColor: gender === g ? "var(--accent)" : "var(--border)",
                }}
                aria-pressed={gender === g}
              >
                {g === "men" ? "Men" : "Women"}
              </button>
            ))}
          </div>

          {/* ── Size table ── */}
          <section aria-labelledby="size-table-heading" className="mb-16">
            <h2
              id="size-table-heading"
              className="text-2xl font-bold uppercase mb-6"
              style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
            >
              {gender === "men" ? "Men's" : "Women's"} Sizing
            </h2>
            <div className="overflow-x-auto" style={{ border: "1px solid var(--border)" }}>
              <table className="w-full min-w-[480px]" style={{ borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "var(--surface)" }}>
                  <tr>
                    <th style={thStyle}>Size</th>
                    <th style={thStyle}>Chest</th>
                    <th style={thStyle}>Waist</th>
                    <th style={thStyle}>Hips</th>
                    {showInseam && <th style={thStyle}>Inseam</th>}
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((row, i) => (
                    <tr
                      key={row.size}
                      style={{ backgroundColor: i % 2 === 0 ? "transparent" : "var(--surface)" }}
                    >
                      <td style={tdStyle(true)}>{row.size}</td>
                      <td style={tdStyle(false)}>{row.chest}</td>
                      <td style={tdStyle(false)}>{row.waist}</td>
                      <td style={tdStyle(false)}>{row.hips}</td>
                      {showInseam && <td style={tdStyle(false)}>{row.inseam}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── How to measure ── */}
          <section aria-labelledby="measure-heading" className="mb-16">
            <h2
              id="measure-heading"
              className="text-2xl font-bold uppercase mb-6"
              style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
            >
              How to Measure
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {measurements.map((m) => (
                <div
                  key={m.label}
                  className="p-6"
                  style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}
                >
                  <h3
                    className="text-xs tracking-widest uppercase mb-3 font-bold"
                    style={{ fontFamily: "var(--font-rajdhani)", color: "var(--accent)" }}
                  >
                    {m.label}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
                  >
                    {m.how}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Fit notes ── */}
          <section aria-labelledby="fit-notes-heading">
            <h2
              id="fit-notes-heading"
              className="text-2xl font-bold uppercase mb-6"
              style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
            >
              Fit Notes by Style
            </h2>
            <div className="flex flex-col" style={{ border: "1px solid var(--border)" }}>
              {fitNotes.map((note, i) => (
                <div
                  key={note.label}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-8 p-6"
                  style={{
                    borderBottom: i < fitNotes.length - 1 ? "1px solid var(--border)" : "none",
                    backgroundColor: i % 2 === 0 ? "transparent" : "var(--surface)",
                  }}
                >
                  <span
                    className="text-xs tracking-widest uppercase font-bold sm:w-40 flex-shrink-0"
                    style={{ fontFamily: "var(--font-rajdhani)", color: "var(--accent)" }}
                  >
                    {note.label}
                  </span>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
                  >
                    {note.note}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
