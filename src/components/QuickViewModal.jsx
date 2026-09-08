import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Heart } from "lucide-react";
import { useLockBodyScroll, useEscapeKey } from "../lib/hooks";
import { formatPrice, swatchColor } from "../lib/utils";
import { RatingStars } from "./ui/RatingStars";
import { PrimaryButton } from "./ui/Buttons";

export function QuickViewModal({ product, onClose, onAddToCart, isWishlisted, onToggleWishlist }) {
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product?.colors?.[0] ?? null);
  useLockBodyScroll(!!product);
  useEscapeKey(onClose, !!product);

  useEffect(() => {
    if (product) {
      setQty(1);
      setColor(product.colors?.[0] ?? null);
    }
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[var(--ink)]/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            className="fixed inset-x-4 top-1/2 z-[81] max-h-[88vh] max-w-3xl -translate-y-1/2 overflow-y-auto bg-[var(--paper)] sm:inset-x-auto sm:left-1/2 sm:w-full sm:-translate-x-1/2"
          >
            <button
              onClick={onClose}
              aria-label="Close quick view"
              className="focus-ring absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center bg-[var(--paper)]/90"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="aspect-[4/5] w-full bg-[var(--sand)]/30 sm:aspect-auto">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col p-6 sm:p-9">
                <p className="font-body text-[11px] uppercase tracking-[0.1em] text-[var(--clay)]">{product.category}</p>
                <h2 className="font-display mt-2 text-[28px] leading-tight text-[var(--ink)]">{product.name}</h2>
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="focus-ring mt-1 inline-block font-body text-xs uppercase tracking-wide text-[var(--clay)] underline underline-offset-4 hover:text-[var(--ink)]"
                >
                  View Full Details
                </Link>
                <div className="mt-2 flex items-center gap-2">
                  <RatingStars rating={product.rating} />
                  <span className="font-body text-xs text-[var(--clay)]">{product.rating.toFixed(1)}</span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="font-body text-lg text-[var(--ink)]">{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span className="font-body text-sm text-[var(--clay)] line-through">{formatPrice(product.oldPrice)}</span>
                  )}
                </div>
                <p className="font-body mt-5 text-sm leading-relaxed text-[var(--charcoal)]/85">{product.description}</p>

                {product.colors?.length > 0 && (
                  <div className="mt-6">
                    <p className="font-body mb-2 text-[11px] uppercase tracking-[0.1em] text-[var(--clay)]">
                      Color — {color}
                    </p>
                    <div className="flex gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setColor(c)}
                          aria-label={`Select color ${c}`}
                          aria-pressed={color === c}
                          className={
                            "focus-ring h-7 w-7 rounded-full border transition-all " +
                            (color === c ? "border-[var(--ink)] ring-1 ring-[var(--ink)] ring-offset-2" : "border-[var(--line)]")
                          }
                          style={{ backgroundColor: swatchColor(c) }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-center gap-4">
                  <p className="font-body text-[11px] uppercase tracking-[0.1em] text-[var(--clay)]">Quantity</p>
                  <div className="flex items-center border border-[var(--line)]">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="focus-ring flex h-9 w-9 items-center justify-center"
                    >
                      <Minus size={14} strokeWidth={1.5} />
                    </button>
                    <span className="font-body w-8 text-center text-sm" aria-live="polite">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="focus-ring flex h-9 w-9 items-center justify-center"
                    >
                      <Plus size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <PrimaryButton
                    className="flex-1"
                    onClick={() => {
                      onAddToCart(product, qty, color);
                      onClose();
                    }}
                  >
                    Add to Cart
                  </PrimaryButton>
                  <button
                    onClick={() => onToggleWishlist(product)}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    aria-pressed={isWishlisted}
                    className="focus-ring flex h-[52px] w-[52px] shrink-0 items-center justify-center border border-[var(--line)]"
                  >
                    <Heart size={18} strokeWidth={1.5} className={isWishlisted ? "fill-[var(--ink)] text-[var(--ink)]" : ""} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
