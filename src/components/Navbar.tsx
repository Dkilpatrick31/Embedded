"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { useCartDrawer } from "@/contexts/CartDrawerContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MegaMenuPanel from "@/components/MegaMenu";

const navLinks = [
  { label: "Men",   href: "/shop?category=Men",   hasMegaMenu: true },
  { label: "Women", href: "/shop?category=Women",  hasMegaMenu: true },
  { label: "Gear",  href: "/shop?category=Gear",   hasMegaMenu: true },
  { label: "About", href: "/about",                hasMegaMenu: false },
];

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

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
  const { totalItems } = useCart();
  const { openDrawer } = useCartDrawer();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // panelOpen drives the AnimatePresence (open/close animation)
  // activeMenu tracks which menu's content to show (persists through close animation)
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Men");
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close both menus on route change
  useEffect(() => {
    setPanelOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  // 150ms delay prevents flicker when cursor travels from nav link to panel
  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setPanelOpen(false), 150);
  }, [clearCloseTimer]);

  const openMenu = useCallback((id: string) => {
    clearCloseTimer();
    setActiveMenu(id);
    setPanelOpen(true);
  }, [clearCloseTimer]);

  const closeMenu = useCallback(() => {
    clearCloseTimer();
    setPanelOpen(false);
  }, [clearCloseTimer]);

  // Clean up timer on unmount
  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const logoSrc = theme === "dark" ? "/logo-dark.png" : "/logo-light.png";

  return (
    <>
      {/* ── Mega menu backdrop (below z-50 header) ── */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            className="fixed inset-0 z-40 hidden md:block"
            style={{ top: "64px", backgroundColor: "rgba(0,0,0,0.25)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{ backgroundColor: "var(--nav-bg)", borderBottom: "1px solid var(--border)" }}
      >
        <nav className="max-w-screen-2xl mx-auto px-6 lg:px-12 h-16 flex items-center">
          {/* Left — hamburger (mobile) or nav links (desktop) */}
          <div className="flex-1 flex items-center gap-8">
            <button
              className="md:hidden opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              style={{ color: "var(--text)" }}
            >
              {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hidden md:block text-xs tracking-widest uppercase transition-opacity"
                style={{
                  color: "var(--text)",
                  fontFamily: "var(--font-rajdhani)",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  opacity: panelOpen && activeMenu === link.label ? 1 : 0.7,
                  transition: "opacity 0.15s ease",
                }}
                onMouseEnter={() => link.hasMegaMenu ? openMenu(link.label) : scheduleClose()}
                onMouseLeave={link.hasMegaMenu ? scheduleClose : undefined}
              >
                {link.label}
                {/* Active underline indicator */}
                {link.hasMegaMenu && panelOpen && activeMenu === link.label && (
                  <motion.span
                    layoutId="nav-active-bar"
                    className="block h-px w-full mt-px"
                    style={{ backgroundColor: "var(--accent)" }}
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Center — logo */}
          <div className="flex-shrink-0 px-4 md:px-8">
            <Link href="/" aria-label="Embedded home" onClick={closeMenu}>
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
                    width={240}
                    height={48}
                    priority
                    className="h-10 md:h-12 w-auto"
                  />
                </motion.div>
              </AnimatePresence>
            </Link>
          </div>

          {/* Right — icons */}
          <div className="flex-1 flex items-center justify-end gap-4 md:gap-5">
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
              className="hidden md:block opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ color: "var(--text)" }}
            >
              <SearchIcon />
            </button>

            <button
              aria-label="Account"
              className="hidden md:block opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ color: "var(--text)" }}
            >
              <AccountIcon />
            </button>

            <button
              onClick={openDrawer}
              aria-label={`Cart (${totalItems})`}
              className="relative opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ color: "var(--text)" }}
            >
              <CartIcon />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] flex items-center justify-center"
                    style={{ backgroundColor: "var(--accent)", color: "var(--bg)", fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* ── Mega menu panel (desktop only, absolute inside header) ── */}
        <AnimatePresence>
          {panelOpen && (
            <MegaMenuPanel
              activeMenu={activeMenu}
              onMouseEnter={clearCloseTimer}
              onMouseLeave={scheduleClose}
              onClose={closeMenu}
            />
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile menu drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed top-16 left-0 right-0 z-40 md:hidden"
              style={{
                backgroundColor: "var(--nav-bg)",
                borderBottom: "1px solid var(--border)",
                backdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="px-6 py-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base tracking-widest uppercase transition-opacity hover:opacity-60"
                    style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)", fontWeight: 600, letterSpacing: "0.15em" }}
                  >
                    {link.label}
                  </Link>
                ))}

                <div
                  className="pt-5 flex items-center gap-5"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
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
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
