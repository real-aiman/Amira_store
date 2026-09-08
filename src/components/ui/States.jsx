import React from "react";
import { X, RefreshCw } from "lucide-react";
import { GhostButton, UnderlineLink } from "./Buttons";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-[3/4] w-full animate-pulse bg-[var(--sand)]/50" />
      <div className="h-3 w-2/3 animate-pulse bg-[var(--sand)]/50" />
      <div className="h-3 w-1/3 animate-pulse bg-[var(--sand)]/40" />
    </div>
  );
}

export function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--line)]">
        <X size={22} strokeWidth={1.5} className="text-[var(--clay)]" />
      </div>
      <h3 className="font-display text-2xl text-[var(--ink)]">Something went wrong</h3>
      <p className="font-body max-w-xs text-sm text-[var(--charcoal)]/70">
        We couldn&apos;t load the collection.
      </p>
      <GhostButton onClick={onRetry} className="mt-2">
        <RefreshCw size={14} strokeWidth={1.5} /> Try Again
      </GhostButton>
    </div>
  );
}

export function EmptyState({ icon, title, message, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--line)] text-[var(--clay)]">
        {icon}
      </div>
      <h3 className="font-display text-xl text-[var(--ink)]">{title}</h3>
      <p className="font-body max-w-[240px] text-sm text-[var(--charcoal)]/70">{message}</p>
      {actionLabel && (
        <button onClick={onAction} className="focus-ring mt-1">
          <UnderlineLink as="span">{actionLabel}</UnderlineLink>
        </button>
      )}
    </div>
  );
}
