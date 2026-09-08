import React from "react";
import { Star } from "lucide-react";

export function RatingStars({ rating, size = 12 }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={i < Math.round(rating) ? "fill-[var(--ink)] text-[var(--ink)]" : "text-[var(--line)]"}
        />
      ))}
    </span>
  );
}
