"use client";

import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Data ──────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: "acceptance",
    heading: "1. Acceptance of Terms",
    body: "By accessing or using the Embedded website (embeddedaviation.com) or purchasing our products, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website or services. We reserve the right to update these terms at any time; continued use of the site following any changes constitutes your acceptance of the revised terms.",
  },
  {
    id: "eligibility",
    heading: "2. Eligibility",
    body: "You must be at least 18 years of age to make a purchase on our website. By placing an order, you represent that you are 18 years or older and have the legal capacity to enter into a binding agreement. If you are purchasing on behalf of an organization, you represent that you have authority to bind that organization to these terms.",
  },
  {
    id: "products",
    heading: "3. Products & Pricing",
    body: "All products are subject to availability. We reserve the right to discontinue any product at any time. Prices are listed in US Dollars and are subject to change without notice. We are not responsible for typographical errors in pricing. If a product is listed at an incorrect price due to an error, we reserve the right to cancel any orders placed at the incorrect price.",
  },
  {
    id: "orders",
    heading: "4. Orders & Payment",
    body: "By placing an order, you offer to purchase a product subject to these terms. We reserve the right to accept or decline your order for any reason. Your order is accepted when we send a shipping confirmation email. Payment must be made in full at the time of purchase. We accept major credit cards, debit cards, and other payment methods displayed at checkout. All payments are processed securely through our payment processor.",
  },
  {
    id: "shipping",
    heading: "5. Shipping & Delivery",
    body: "Shipping times and rates are as described on our Shipping page. While we make every effort to meet our stated delivery windows, we are not responsible for delays caused by carriers, customs, or events outside our control. Title and risk of loss for products pass to you upon delivery to the carrier.",
  },
  {
    id: "returns",
    heading: "6. Returns & Refunds",
    body: "Returns are accepted within 30 days of delivery for unworn, unwashed items with original tags attached. Sale and final-sale items are non-returnable. Refunds are issued to the original payment method within 5–7 business days of receiving the returned item. We reserve the right to refuse returns that do not meet these conditions. See our Shipping & Returns page for full details.",
  },
  {
    id: "intellectual-property",
    heading: "7. Intellectual Property",
    body: "All content on this website — including text, graphics, logos, product images, audio clips, digital downloads, and data compilations — is the property of Embedded Aviation, LLC or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any website content without our prior written permission.",
  },
  {
    id: "user-conduct",
    heading: "8. User Conduct",
    body: "You agree not to use our website for any unlawful purpose, to interfere with the proper functioning of the site, to attempt to gain unauthorized access to any portion of the site, or to transmit any harmful, offensive, or disruptive content. We reserve the right to terminate access to our website for any user who violates these terms.",
  },
  {
    id: "disclaimer",
    heading: "9. Disclaimer of Warranties",
    body: 'Our website and products are provided "as is" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the website will be error-free, uninterrupted, or free of viruses or other harmful components.',
  },
  {
    id: "liability",
    heading: "10. Limitation of Liability",
    body: "To the fullest extent permitted by law, Embedded Aviation, LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising out of or in connection with your use of the website or products. Our total liability to you for any claim arising from these terms or your use of the website shall not exceed the amount you paid for the relevant product.",
  },
  {
    id: "governing-law",
    heading: "11. Governing Law",
    body: "These Terms of Service are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Los Angeles County, California.",
  },
  {
    id: "contact",
    heading: "12. Contact",
    body: "If you have questions about these Terms of Service, please contact us at hello@embeddedaviation.com or write to us at: Embedded Aviation, LLC, Los Angeles, California, USA.",
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TermsClient() {
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
            Terms of Service
          </h1>
          <p className="text-xs opacity-40" style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}>
            Effective date: January 1, 2025
          </p>
        </section>

        <div className="max-w-screen-lg mx-auto px-6 lg:px-12 py-16">
          {/* Table of contents */}
          <nav aria-label="Terms of service contents" className="mb-16 p-8" style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}>
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
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
                >
                  {s.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
