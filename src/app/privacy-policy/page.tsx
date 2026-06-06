import type { Metadata } from "next";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy — Embedded",
  description: "Embedded privacy policy. Learn how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy — Embedded",
    description: "Embedded privacy policy.",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy — Embedded",
    description: "Embedded privacy policy.",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
