import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { CATEGORIES, SORT_OPTIONS } from "../lib/data";

export function FilterBar({ activeCategory, onCategoryChange, sort, onSortChange, resultCount }) {
  return (
    <div className="flex flex-col gap-5 border-b border-[var(--line)] pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={cn(
              "focus-ring font-body relative pb-1 text-[13px] uppercase tracking-[0.1em] transition-colors",
              activeCategory === cat ? "text-[var(--ink)]" : "text-[var(--clay)] hover:text-[var(--ink)]"
            )}
            aria-pressed={activeCategory === cat}
          >
            {cat}
            {activeCategory === cat && (
              <motion.span layoutId="cat-underline" className="absolute -bottom-[1px] left-0 h-[1.5px] w-full bg-[var(--ink)]" />
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <span className="font-body text-xs text-[var(--clay)]">{resultCount} pieces</span>
        <label className="sr-only" htmlFor="sort-select">
          Sort products
        </label>
        <select
          id="sort-select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="focus-ring font-body cursor-pointer border-0 border-b border-[var(--line)] bg-transparent py-1 text-[13px] text-[var(--ink)]"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sort — {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
