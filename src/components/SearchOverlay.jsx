import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Search } from "lucide-react";
import { useLockBodyScroll, useEscapeKey } from "../lib/hooks";
import { formatPrice } from "../lib/utils";
import { Eyebrow } from "./ui/Eyebrow";

export function SearchOverlay({ open, onClose, products }) {
  const [term, setTerm] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  useLockBodyScroll(open);
  useEscapeKey(onClose, open);

  useEffect(() => {
    if (open) {
      setTerm("");
      const t = window.setTimeout(() => inputRef.current?.focus(), 350);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  const results = useMemo(() => {
    if (!term.trim()) return [];
    const q = term.trim().toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      )
      .slice(0, 6);
  }, [term, products]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex flex-col bg-[var(--paper)]"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 pt-24 sm:pt-32">
            <div className="flex items-center justify-between">
              <Eyebrow>Search</Eyebrow>
              <button onClick={onClose} aria-label="Close search" className="focus-ring flex h-9 w-9 items-center justify-center">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <motion.div
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mt-6 flex items-end gap-4 border-b border-[var(--ink)] pb-4"
            >
              <Search size={24} strokeWidth={1.5} className="mb-1 shrink-0 text-[var(--clay)]" />
              <input
                ref={inputRef}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                type="text"
                placeholder="Search coats, essentials, accessories…"
                aria-label="Search products"
                className="font-display w-full bg-transparent text-2xl text-[var(--ink)] outline-none placeholder:text-[var(--line)] sm:text-3xl"
              />
            </motion.div>

            <div className="mt-2 flex-1 overflow-y-auto pb-16">
              {term.trim() && results.length === 0 && (
                <div className="pt-16 text-center">
                  <p className="font-body text-sm text-[var(--charcoal)]">
                    No results for “{term}”. Try “coat”, “silk”, or “essentials”.
                  </p>
                </div>
              )}
              <ul className="divide-y divide-[var(--line)]">
                {results.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => {
                        navigate(`/product/${p.id}`);
                        onClose();
                      }}
                      className="focus-ring flex w-full items-center gap-4 py-4 text-left"
                    >
                      <img src={p.image} alt="" className="h-16 w-14 shrink-0 object-cover" />
                      <span className="flex-1">
                        <span className="font-body block text-sm text-[var(--ink)]">{p.name}</span>
                        <span className="font-body block text-xs text-[var(--clay)]">{p.category}</span>
                      </span>
                      <span className="font-body text-sm text-[var(--ink)]">{formatPrice(p.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
