"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Gear", href: "/gear" },
  { label: "About", href: "/about" },
];

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [cartCount] = useState(0);

  const logoSrc =
    theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ backgroundColor: "var(--nav-bg)", borderBottom: "1px solid var(--border)" }}
    >
      <nav className="max-w-screen-2xl mx-auto px-6 lg:px-12 h-16 flex items-center">
        {/* Left — nav links */}
        <div className="flex-1 flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
              style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)", fontWeight: 600, letterSpacing: "0.15em" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Center — logo */}
        <div className="flex-shrink-0 px-8">
          <Link href="/" aria-label="Embedded home">
            <AnimatePresence mode="wait">
              <motion.div
                key={logoSrc}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Image
                  src={logoSrc}
                  alt="Embedded"
                  width={160}
                  height={32}
                  priority
                  className="h-8 w-auto"
                />
              </motion.div>
            </AnimatePresence>
          </Link>
        </div>

        {/* Right — icons */}
        <div className="flex-1 flex items-center justify-end gap-5">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            style={{ color: "var(--text)" }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -30 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 30 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            aria-label="Search"
            className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            style={{ color: "var(--text)" }}
          >
            <SearchIcon />
          </button>

          <button
            aria-label="Account"
            className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            style={{ color: "var(--text)" }}
          >
            <AccountIcon />
          </button>

          <button
            aria-label={`Cart (${cartCount})`}
            className="relative opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            style={{ color: "var(--text)" }}
          >
            <CartIcon />
            {cartCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] flex items-center justify-center"
                style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
