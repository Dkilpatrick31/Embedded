"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    // Wire to your error-tracking service (e.g. Sentry) here
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6">
          <svg
            width="40" height="40" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1"
            className="opacity-20"
            style={{ color: "var(--text)" }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>

          <div className="text-center">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-2 opacity-40"
              style={{ color: "var(--text)", fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
            >
              Something went wrong
            </p>
            <p
              className="text-xs max-w-xs"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-dm-sans)" }}
            >
              We hit an unexpected error. Try refreshing the page.
            </p>
          </div>

          <Link
            href="/"
            className="inline-block px-8 py-3.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--bg)",
              fontFamily: "var(--font-rajdhani)",
              fontWeight: 700,
              letterSpacing: "0.2em",
            }}
          >
            Return Home
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}
