import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Embedded",
  description: "Get in touch with the Embedded team. We're here to help with orders, sizing, wholesale inquiries, and more.",
  openGraph: {
    title: "Contact — Embedded",
    description: "Get in touch with the Embedded team.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Embedded",
    description: "Get in touch with the Embedded team.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
