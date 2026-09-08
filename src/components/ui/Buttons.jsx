import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { cn } from "../../lib/utils";

export function IconButton({ label, onClick, children, badge, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "focus-ring relative flex h-9 w-9 items-center justify-center text-current transition-colors hover:opacity-60",
        className
      )}
    >
      {children}
      {typeof badge === "number" && badge > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--ink)] px-[3px] font-body text-[10px] font-medium leading-none text-[var(--paper)]">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </button>
  );
}

export function UnderlineLink({ children, className, to, ...props }) {
  const classes = cn(
    "group relative inline-block font-body text-[13px] tracking-wide text-current",
    className
  );
  const underline = (
    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
  );
  if (to) {
    return (
      <RouterLink to={to} className={classes} {...props}>
        {children}
        {underline}
      </RouterLink>
    );
  }
  return (
    <a className={classes} {...props}>
      {children}
      {underline}
    </a>
  );
}

export function PrimaryButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 bg-[var(--ink)] px-7 py-3.5 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-[var(--paper)] transition-transform duration-200 hover:-translate-y-[1px] active:translate-y-0",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 border border-[var(--ink)]/70 px-7 py-3.5 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-[var(--ink)] transition-colors duration-200 hover:bg-[var(--ink)] hover:text-[var(--paper)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
