import type { Metadata } from "next";
import { Rajdhani, DM_Sans } from "next/font/google";
import AppProviders from "@/components/AppProviders";
import CartDrawer from "@/components/CartDrawer";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://embedded.com"),
  title: "Embedded — Premium Aviation Pilot Clothing",
  description:
    "Engineered for those who operate above the clouds. Premium aviation-inspired clothing for the modern pilot.",
  twitter: {
    card: "summary_large_image",
    title: "Embedded — Premium Aviation Pilot Clothing",
    description:
      "Engineered for those who operate above the clouds. Premium aviation-inspired clothing for the modern pilot.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${rajdhani.variable} ${dmSans.variable}`}
    >
      <body>
        <AppProviders>
          <PageTransition>{children}</PageTransition>
          <CartDrawer />
        </AppProviders>
      </body>
    </html>
  );
}
