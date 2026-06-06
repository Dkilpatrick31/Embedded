"use client";

import { useState } from "react";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Types ─────────────────────────────────────────────────────────────────────

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// ── Contact info cards ────────────────────────────────────────────────────────

const contactCards = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    heading: "Email",
    detail: "hello@embeddedaviation.com",
    sub: "We reply within 24–48 hours",
    href: "mailto:hello@embeddedaviation.com",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    heading: "Phone",
    detail: "+1 (800) 555-0193",
    sub: "Mon–Fri, 9am–5pm PT",
    href: "tel:+18005550193",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    heading: "Headquarters",
    detail: "Los Angeles, California",
    sub: "By appointment only",
    href: null,
  },
];

// ── FAQ teaser ────────────────────────────────────────────────────────────────

const faqTeasers = [
  { q: "What is your return policy?", href: "/faq#orders" },
  { q: "How do I find my size?", href: "/size-guide" },
  { q: "Do you offer wholesale?", href: "/faq#wholesale" },
  { q: "Where do you ship?", href: "/shipping" },
];

// ── Page component ────────────────────────────────────────────────────────────

export default function ContactClient() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email";
    if (!form.subject.trim()) next.subject = "Subject is required";
    if (!form.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const inputBase = "w-full px-4 py-3 text-sm bg-transparent outline-none transition-colors";
  const inputStyle = {
    border: "1px solid var(--border)",
    color: "var(--text)",
    fontFamily: "var(--font-dm-sans)",
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <AnnouncementBar />
      <Navbar />

      <main id="main-content">
        {/* ── Hero ── */}
        <section
          className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-36"
          style={{ backgroundColor: "var(--surface)", borderBottom: "1px solid var(--border)" }}
        >
          <p
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)" }}
          >
            Reach Out
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold uppercase leading-none mb-4"
            style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
          >
            Contact Us
          </h1>
          <p
            className="max-w-md text-sm leading-relaxed opacity-60"
            style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}
          >
            Questions about your order, sizing help, or wholesale inquiries — we&apos;re standing by.
          </p>
        </section>

        {/* ── Contact cards ── */}
        <section className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {contactCards.map((card) => (
              <div
                key={card.heading}
                className="flex flex-col gap-4 p-8"
                style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}
              >
                <span style={{ color: "var(--accent)" }}>{card.icon}</span>
                <div>
                  <h2
                    className="text-xs tracking-[0.2em] uppercase mb-1 font-bold"
                    style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
                  >
                    {card.heading}
                  </h2>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="text-sm transition-opacity hover:opacity-80"
                      style={{ color: "var(--accent)", fontFamily: "var(--font-dm-sans)" }}
                    >
                      {card.detail}
                    </a>
                  ) : (
                    <span
                      className="text-sm"
                      style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}
                    >
                      {card.detail}
                    </span>
                  )}
                  <p
                    className="text-xs mt-1 opacity-50"
                    style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}
                  >
                    {card.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Form + FAQ row ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2
                className="text-3xl font-bold uppercase mb-8"
                style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
              >
                Send a Message
              </h2>

              {submitted ? (
                <div
                  className="flex flex-col items-start gap-4 p-10"
                  style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}
                  role="status"
                  aria-live="polite"
                >
                  <span style={{ color: "var(--accent)" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <h3
                    className="text-2xl font-bold uppercase"
                    style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
                  >
                    Message Received
                  </h3>
                  <p
                    className="text-sm opacity-60"
                    style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}
                  >
                    Thanks for reaching out. Our team will be in touch within 24–48 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="text-xs tracking-widest uppercase mt-2 transition-opacity hover:opacity-70"
                    style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs tracking-widest uppercase mb-2"
                        style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)", fontWeight: 700 }}
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        className={inputBase}
                        style={{
                          ...inputStyle,
                          borderColor: errors.name ? "#ef4444" : "var(--border)",
                        }}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs tracking-widest uppercase mb-2"
                        style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)", fontWeight: 700 }}
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        className={inputBase}
                        style={{
                          ...inputStyle,
                          borderColor: errors.email ? "#ef4444" : "var(--border)",
                        }}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs tracking-widest uppercase mb-2"
                      style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)", fontWeight: 700 }}
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={inputBase}
                      style={{
                        ...inputStyle,
                        borderColor: errors.subject ? "#ef4444" : "var(--border)",
                        backgroundColor: "var(--surface)",
                        appearance: "none",
                      }}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    >
                      <option value="" style={{ backgroundColor: "var(--surface)" }}>Select a topic…</option>
                      <option value="Order Inquiry" style={{ backgroundColor: "var(--surface)" }}>Order Inquiry</option>
                      <option value="Sizing Help" style={{ backgroundColor: "var(--surface)" }}>Sizing Help</option>
                      <option value="Returns & Exchanges" style={{ backgroundColor: "var(--surface)" }}>Returns &amp; Exchanges</option>
                      <option value="Wholesale" style={{ backgroundColor: "var(--surface)" }}>Wholesale</option>
                      <option value="Press & Media" style={{ backgroundColor: "var(--surface)" }}>Press &amp; Media</option>
                      <option value="Other" style={{ backgroundColor: "var(--surface)" }}>Other</option>
                    </select>
                    {errors.subject && (
                      <p id="subject-error" className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs tracking-widest uppercase mb-2"
                      style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)", fontWeight: 700 }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      className={inputBase}
                      style={{
                        ...inputStyle,
                        borderColor: errors.message ? "#ef4444" : "var(--border)",
                        resize: "vertical",
                      }}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="self-start px-10 py-4 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--bg)",
                      fontFamily: "var(--font-rajdhani)",
                      fontWeight: 700,
                    }}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* FAQ teaser */}
            <div>
              <h2
                className="text-3xl font-bold uppercase mb-8"
                style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
              >
                Quick Answers
              </h2>
              <ul className="flex flex-col gap-4 mb-8">
                {faqTeasers.map(({ q, href }) => (
                  <li key={q}>
                    <Link
                      href={href}
                      className="flex items-center justify-between gap-4 p-5 transition-opacity hover:opacity-80 group"
                      style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}
                    >
                      <span
                        className="text-sm"
                        style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}
                      >
                        {q}
                      </span>
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                        aria-hidden="true"
                        style={{ color: "var(--accent)", flexShrink: 0 }}
                      >
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/faq"
                className="text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
                style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
              >
                View All FAQs →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
