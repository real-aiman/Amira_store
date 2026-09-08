import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { formatPrice } from "../lib/utils";

export function ProductCard({ product, onQuickView, onAddToCart, isWishlisted, onToggleWishlist }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--sand)]/30">
        <Link
          to={`/product/${product.id}`}
          className="focus-ring block h-full w-full"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
          <img
            src={product.secondaryImage}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </Link>

        {product.oldPrice && (
          <span className="absolute left-3 top-3 bg-[var(--ink)] px-2 py-1 font-body text-[10px] uppercase tracking-wider text-[var(--paper)]">
            Sale
          </span>
        )}

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            onClick={() => onToggleWishlist(product)}
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={isWishlisted}
            className="focus-ring flex h-8 w-8 items-center justify-center bg-[var(--paper)]/90 backdrop-blur-sm transition-transform hover:scale-105"
          >
            <motion.span
              key={isWishlisted ? "on" : "off"}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Heart size={15} strokeWidth={1.5} className={isWishlisted ? "fill-[var(--ink)] text-[var(--ink)]" : "text-[var(--ink)]"} />
            </motion.span>
          </button>
          <button
            onClick={() => onQuickView(product)}
            aria-label={`Quick view ${product.name}`}
            className="focus-ring flex h-8 w-8 items-center justify-center bg-[var(--paper)]/90 opacity-0 backdrop-blur-sm transition-all hover:scale-105 group-hover:opacity-100"
          >
            <Eye size={15} strokeWidth={1.5} className="text-[var(--ink)]" />
          </button>
        </div>

        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => onAddToCart(product)}
            className="focus-ring w-full bg-[var(--ink)] py-2.5 font-body text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--paper)] transition-colors hover:bg-[var(--charcoal)]"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Link to={`/product/${product.id}`} className="focus-ring mt-3.5 text-left">
        <p className="font-body text-[11px] uppercase tracking-[0.1em] text-[var(--clay)]">{product.category}</p>
        <h3 className="font-display mt-1 text-[17px] leading-snug text-[var(--ink)]">{product.name}</h3>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="font-body text-sm text-[var(--ink)]">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="font-body text-sm text-[var(--clay)] line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
