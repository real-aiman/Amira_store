import { twMerge } from "tailwind-merge";

// Plain string-join can't resolve conflicting utilities (e.g. a component's
// own `text-[var(--paper)]` vs. a caller's override `text-[var(--ink)]`) —
// twMerge ensures the class passed LAST always wins, matching what callers
// expect when they override a shared button/link's default colors.
export const cn = (...parts) => twMerge(parts.filter(Boolean).join(" "));

export const formatPrice = (n) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;

export function swatchColor(name) {
  const map = {
    Stone: "#c9bfa9",
    Ink: "#141310",
    Umber: "#6b4a30",
    Sand: "#ddceb8",
    Bone: "#f5f1e9",
    Charcoal: "#2c2924",
    Oat: "#e4d9c4",
    Clay: "#8a7458",
    Gold: "#b6934f",
  };
  return map[name] || "#cccccc";
}
