"use client";

import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Sections ──────────────────────────────────────────────────────────────────

const sections = [
  {
    id: "information-we-collect",
    heading: "1. Information We Collect",
    body: `We collect information you provide directly to us when you create an account, place an order, sign up for our newsletter, or contact us for support. This includes:

**Personal identifiers:** Name, email address, postal address, phone number.
**Payment information:** Credit or debit card numbers, billing address. Payment card data is processed by our payment processor (Stripe) and we do not store full card numbers on our servers.
**Order information:** Purchase history, returns, and communications related to your orders.
**Account credentials:** Username and hashed password if you create an account.
**Communications:** Any messages you send us via email or our contact form.

We also collect certain information automatically when you visit our website, including IP address, browser type, operating system, referring URLs, pages viewed, and session duration. We use cookies and similar tracking technologies for this purpose (see Section 5).`,
  },
  {
    id: "how-we-use",
    heading: "2. How We Use Your Information",
    body: `We use the information we collect to:

- Process and fulfill your orders, including shipping and returns
- Communicate with you about your orders, account, and customer service inquiries
- Send marketing communications if you have opted in (you can unsubscribe at any time)
- Improve and personalise your experience on our website
- Detect and prevent fraud, abuse, and security incidents
- Comply with legal obligations
- Analyze trends and website usage to improve our products and services

We will never sell your personal information to third parties.`,
  },
  {
    id: "sharing",
    heading: "3. Sharing Your Information",
    body: `We share your information only in the following circumstances:

**Service providers:** We engage third-party vendors to assist in operating our website and fulfilling orders (e.g., shipping carriers, payment processors, email service providers). These parties access your data only as necessary to perform their services and are contractually obligated to protect it.
**Business transfers:** If Embedded is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or prominent notice on our website.
**Legal requirements:** We may disclose your information if required by law, court order, or governmental authority, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.`,
  },
  {
    id: "cookies",
    heading: "4. Cookies & Tracking",
    body: `We use cookies and similar tracking technologies to:

- Keep you logged in to your account
- Remember items in your shopping cart
- Understand how visitors use our site (analytics)
- Deliver relevant advertising (if you have not opted out)

You can control cookies through your browser settings. Disabling cookies may affect certain features of the website. We honor browser "Do Not Track" signals where feasible.`,
  },
  {
    id: "your-rights",
    heading: "5. Your Rights",
    body: `Depending on your location, you may have the following rights regarding your personal data:

- **Access:** Request a copy of the personal data we hold about you.
- **Correction:** Request correction of inaccurate or incomplete data.
- **Deletion:** Request deletion of your personal data, subject to certain exceptions.
- **Portability:** Receive your data in a structured, machine-readable format.
- **Opt-out:** Opt out of marketing communications at any time by clicking "unsubscribe" in any email or contacting us directly.
- **Restriction:** Request that we restrict processing of your data in certain circumstances.

To exercise any of these rights, email us at privacy@embeddedaviation.com. We will respond within 30 days.`,
  },
  {
    id: "data-retention",
    heading: "6. Data Retention",
    body: `We retain your personal data for as long as necessary to fulfill the purposes described in this policy, including for the duration of your account, and for a period thereafter as required by law (e.g., for tax and accounting purposes, typically 7 years). When data is no longer needed, we securely delete or anonymize it.`,
  },
  {
    id: "security",
    heading: "7. Security",
    body: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These include TLS encryption for data in transit, hashed passwords, and access controls limiting who can access your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    id: "children",
    heading: "8. Children's Privacy",
    body: `Our website and services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately and we will delete it.`,
  },
  {
    id: "changes",
    heading: "9. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page with a revised effective date, and where appropriate, by sending you an email notification. We encourage you to review this policy periodically.`,
  },
  {
    id: "contact",
    heading: "10. Contact Us",
    body: `If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:

**Embedded Aviation, LLC**
hello@embeddedaviation.com
Los Angeles, California, USA`,
  },
];

// ── Render helper ─────────────────────────────────────────────────────────────

function renderBody(text: string) {
  return text.split("\n\n").map((para, i) => {
    const parts = para.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}>
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j} style={{ color: "var(--text)" }}>{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith("- ")) {
            return null;
          }
          return part;
        })}
      </p>
    );
  });
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PrivacyPolicyClient() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <AnnouncementBar />
      <Navbar />

      <main id="main-content">
        {/* ── Hero ── */}
        <section
          className="flex flex-col items-center justify-center text-center px-6 py-20 md:py-28"
          style={{ backgroundColor: "var(--surface)", borderBottom: "1px solid var(--border)" }}
        >
          <p
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)" }}
          >
            Legal
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold uppercase leading-none mb-4"
            style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-xs opacity-40" style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}>
            Effective date: January 1, 2025
          </p>
        </section>

        <div className="max-w-screen-lg mx-auto px-6 lg:px-12 py-16">
          {/* Table of contents */}
          <nav aria-label="Privacy policy contents" className="mb-16 p-8" style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}>
            <h2
              className="text-xs tracking-widest uppercase mb-4 font-bold"
              style={{ fontFamily: "var(--font-rajdhani)", color: "var(--accent)" }}
            >
              Contents
            </h2>
            <ol className="flex flex-col gap-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-xs transition-opacity hover:opacity-100 opacity-60"
                    style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="flex flex-col gap-12">
            {sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`}>
                <h2
                  id={`${s.id}-heading`}
                  className="text-xl font-bold uppercase mb-4"
                  style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
                >
                  {s.heading}
                </h2>
                <div>{renderBody(s.body)}</div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
