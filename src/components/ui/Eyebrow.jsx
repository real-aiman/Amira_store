import React from "react";
import { cn } from "../../lib/utils";

export function Eyebrow({ children, className }) {
  return (
    <p
      className={cn(
        "font-body text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--clay)]",
        className
      )}
    >
      {children}
    </p>
  );
}
