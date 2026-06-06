"use client";

import { useState } from "react";
import Link from "next/link";

const footerColumns = [
  {
    heading: "Shop",
    links: [
      { label: "Men", href: "/men" },
      { label: "Women", href: "/women" },
      { label: "Gear", href: "/gear" },
      { label: "New Arrivals", href: "/new" },
      { label: "Sale", href: "/sale" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Size Guide", href: "/size-guide" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "Care Instructions", href: "/care" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer
      className="mt-auto"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {/* Main footer grid */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Newsletter column */}
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)" }}
            >
              Join the Flight Crew
            </p>
            <h3
              className="text-2xl font-bold uppercase leading-tight mb-3"
              style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
            >
              Early Access
              <br />& Exclusives
            </h3>
            <p
              className="text-xs leading-relaxed mb-6"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
            >
              Be first to receive new drops, editorial features, and
              members-only offers.
            </p>

            {submitted ? (
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)" }}
              >
                You&apos;re on the list. Welcome aboard.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 text-xs bg-transparent outline-none transition-colors placeholder-opacity-40"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                />
                <button
                  type="submit"
                  className="w-full py-3 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--bg)",
                    fontFamily: "var(--font-rajdhani)",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                  }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4
                className="text-xs tracking-widest uppercase mb-6"
                style={{
                  color: "var(--text)",
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                }}
              >
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs transition-opacity hover:opacity-100 opacity-60"
                      style={{
                        color: "var(--text)",
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-6 flex flex-col items-center gap-4 md:flex-row md:justify-between"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <span
          className="text-xs opacity-40"
          style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}
        >
          © {new Date().getFullYear()} Embedded. All rights reserved.
        </span>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {["Privacy Policy", "Terms of Service", "Cookie Preferences"].map(
            (item) => (
              <Link
                key={item}
                href="#"
                className="text-xs opacity-40 hover:opacity-70 transition-opacity"
                style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}
              >
                {item}
              </Link>
            )
          )}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {[
            { label: "Instagram", href: "https://instagram.com" },
            { label: "Twitter",   href: "https://twitter.com" },
            { label: "Pinterest", href: "https://pinterest.com" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-40 hover:opacity-80 transition-opacity text-xs tracking-widest uppercase"
              style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
            >
              {label.slice(0, 2)}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
