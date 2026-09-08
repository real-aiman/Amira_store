import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1440px] flex-col items-center justify-center px-5 pt-24 text-center sm:px-8 lg:px-12">
      <p className="font-body text-[11px] uppercase tracking-[0.22em] text-[var(--clay)]">404</p>
      <h1 className="font-display mt-4 text-[32px] text-[var(--ink)] sm:text-[40px]">Page not found</h1>
      <p className="font-body mt-3 max-w-sm text-sm text-[var(--charcoal)]/70">
        The page you&apos;re looking for doesn&apos;t exist, or has moved.
      </p>
      <Link to="/" className="focus-ring mt-7">
        <span className="font-body text-sm uppercase tracking-wide text-[var(--ink)] underline underline-offset-4">
          Back to Home
        </span>
      </Link>
    </div>
  );
}
