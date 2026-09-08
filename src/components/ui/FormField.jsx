import React from "react";
import { cn } from "../../lib/utils";

export function FormField({ label, id, error, className, containerClassName, ...props }) {
  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      <label htmlFor={id} className="font-body text-[11px] uppercase tracking-[0.1em] text-[var(--clay)]">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "focus-ring font-body border bg-transparent px-3.5 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--clay)]/60",
          error ? "border-[#c17a5c]" : "border-[var(--line)]",
          className
        )}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="font-body text-xs text-[#c17a5c]">
          {error}
        </p>
      )}
    </div>
  );
}
