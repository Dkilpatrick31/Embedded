"use client";

import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Data ──────────────────────────────────────────────────────────────────────

const openings = [
  {
    id: "senior-product-designer",
    title: "Senior Product Designer",
    department: "Design",
    location: "Los Angeles, CA",
    type: "Full-time",
    description:
      "We're looking for a Senior Product Designer with a passion for technical apparel and aviation culture. You'll own the visual direction of new collections, working closely with our sourcing and brand teams from concept through production.",
    requirements: [
      "5+ years of experience in apparel or product design",
      "Proficiency in Adobe Illustrator, Photoshop, and CLO3D or similar",
      "Strong understanding of technical fabrics and garment construction",
      "Portfolio demonstrating range from ideation to production",
      "Bonus: PPL or commercial pilot certificate",
    ],
  },
  {
    id: "ecommerce-engineer",
    title: "E-Commerce Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
    description:
      "Help build the Embedded digital storefront. You'll work on our Next.js front-end, Shopify integration, and internal tooling — shipping code that's fast, accessible, and obsessively polished.",
    requirements: [
      "3+ years of experience with Next.js and TypeScript",
      "Experience with headless commerce (Shopify Storefront API or similar)",
      "Strong CSS fundamentals and eye for design fidelity",
      "Familiarity with Tailwind CSS and Framer Motion",
      "Commitment to accessibility (WCAG 2.1 AA)",
    ],
  },
  {
    id: "brand-partnerships-manager",
    title: "Brand Partnerships Manager",
    department: "Marketing",
    location: "Los Angeles, CA / Remote",
    type: "Full-time",
    description:
      "Drive strategic partnerships with aviation organizations, FBOs, airlines, and lifestyle brands. You'll identify, negotiate, and activate deals that put Embedded gear in the hands of the aviation community worldwide.",
    requirements: [
      "4+ years in brand partnerships, sponsorships, or business development",
      "Established network within aviation, lifestyle, or premium apparel sectors",
      "Exceptional written and verbal communication skills",
      "Ability to manage multiple deals simultaneously with minimal oversight",
      "Deep personal interest in aviation culture",
    ],
  },
];

const values = [
  {
    label: "Altitude First",
    body: "We build products and a company culture worthy of the skies. High standards, always.",
  },
  {
    label: "Craft Over Speed",
    body: "We move fast where it counts and slow down where it matters. Quality is non-negotiable.",
  },
  {
    label: "Crew Mentality",
    body: "Preflight together, debrief together. Ego stays on the ground.",
  },
  {
    label: "Long Haul",
    body: "We're building something that outlasts a season. We invest in people for the long game.",
  },
];

// ── Job card ──────────────────────────────────────────────────────────────────

function JobCard({ job }: { job: (typeof openings)[0] }) {
  const mailto = `mailto:careers@embeddedaviation.com?subject=Application: ${encodeURIComponent(job.title)}&body=Hi Embedded team,%0D%0A%0D%0AI'm applying for the ${encodeURIComponent(job.title)} role.%0D%0A%0D%0A[Please attach your resume and a brief introduction]%0D%0A%0D%0AThank you.`;

  return (
    <article
      aria-labelledby={`job-${job.id}-title`}
      className="p-8 flex flex-col gap-6"
      style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3
            id={`job-${job.id}-title`}
            className="text-2xl font-bold uppercase mb-2"
            style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
          >
            {job.title}
          </h3>
          <div className="flex flex-wrap gap-3">
            {[job.department, job.location, job.type].map((tag) => (
              <span
                key={tag}
                className="text-xs tracking-wider uppercase px-3 py-1"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <a
          href={mailto}
          className="flex-shrink-0 px-6 py-3 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--bg)",
            fontFamily: "var(--font-rajdhani)",
            fontWeight: 700,
          }}
          aria-label={`Apply for ${job.title}`}
        >
          Apply Now
        </a>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}>
        {job.description}
      </p>

      {/* Requirements */}
      <div>
        <h4
          className="text-xs tracking-widest uppercase mb-3 font-bold"
          style={{ fontFamily: "var(--font-rajdhani)", color: "var(--accent)" }}
        >
          What We're Looking For
        </h4>
        <ul className="flex flex-col gap-2">
          {job.requirements.map((req) => (
            <li key={req} className="flex items-start gap-3">
              <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <circle cx="6" cy="6" r="3" />
                </svg>
              </span>
              <span className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}>
                {req}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CareersClient() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <AnnouncementBar />
      <Navbar />

      <main id="main-content">
        {/* ── Hero ── */}
        <section
          className="relative flex flex-col items-center justify-center text-center px-6 py-28 md:py-44 overflow-hidden"
          style={{ backgroundColor: "var(--surface)", borderBottom: "1px solid var(--border)" }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="careers-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#careers-grid)" />
            </svg>
          </div>

          <p
            className="text-xs tracking-[0.25em] uppercase mb-4 relative"
            style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)" }}
          >
            We're Hiring
          </p>
          <h1
            className="text-5xl md:text-8xl font-bold uppercase leading-none mb-6 relative"
            style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
          >
            Join the Crew
          </h1>
          <p
            className="max-w-lg text-sm leading-relaxed opacity-60 relative"
            style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}
          >
            We&apos;re building the go-to brand for the global aviation community. If you live and breathe aviation culture, obsess over craft, and want your work to mean something — you&apos;ll fit right in.
          </p>
        </section>

        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
          {/* ── Values ── */}
          <section aria-labelledby="values-heading" className="mb-24">
            <h2
              id="values-heading"
              className="text-2xl font-bold uppercase mb-10"
              style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
            >
              How We Fly
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v) => (
                <div key={v.label} className="p-7" style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}>
                  <h3
                    className="text-xs tracking-widest uppercase mb-3 font-bold"
                    style={{ fontFamily: "var(--font-rajdhani)", color: "var(--accent)" }}
                  >
                    {v.label}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}>
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Open positions ── */}
          <section aria-labelledby="openings-heading" className="mb-20">
            <div className="flex items-baseline justify-between mb-10">
              <h2
                id="openings-heading"
                className="text-2xl font-bold uppercase"
                style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
              >
                Open Positions
              </h2>
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "var(--accent)", fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
              >
                {openings.length} Roles
              </span>
            </div>
            <div className="flex flex-col gap-6">
              {openings.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>

          {/* ── Don't see your role CTA ── */}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-6 p-10"
            style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}
          >
            <div>
              <h3
                className="text-xl font-bold uppercase mb-1"
                style={{ fontFamily: "var(--font-rajdhani)", color: "var(--text)" }}
              >
                Don&apos;t See Your Role?
              </h3>
              <p className="text-sm opacity-60" style={{ color: "var(--text)", fontFamily: "var(--font-dm-sans)" }}>
                We&apos;re always interested in exceptional people. Send us a note.
              </p>
            </div>
            <a
              href="mailto:careers@embeddedaviation.com?subject=General Application"
              className="flex-shrink-0 px-8 py-4 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 700,
              }}
              aria-label="Send a general application email"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
