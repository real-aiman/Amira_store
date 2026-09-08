import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Heart, ChevronRight, Check, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { formatPrice, swatchColor } from "../lib/utils";
import { RatingStars } from "../components/ui/RatingStars";
import { PrimaryButton } from "../components/ui/Buttons";
import { ProductCard } from "../components/ProductCard";
import { Eyebrow } from "../components/ui/Eyebrow";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, isWishlisted, toggleWishlist, setQuickViewProduct } = useStore();

  const product = useMemo(() => products.find((p) => p.id === id), [products, id]);

  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product?.colors?.[0] ?? null);
  const [activeImage, setActiveImage] = useState(product?.image);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    setQty(1);
    setColor(product?.colors?.[0] ?? null);
    setActiveImage(product?.image);
    setJustAdded(false);
  }, [product]);

  if (!product) {
    return (
      <div className="mx-auto max-w-[1440px] px-5 py-32 text-center sm:px-8 lg:px-12">
        <h1 className="font-display text-3xl text-[var(--ink)]">Piece not found</h1>
        <p className="font-body mt-3 text-sm text-[var(--charcoal)]/70">
          This item may have sold out or moved.
        </p>
        <button onClick={() => navigate("/")} className="focus-ring mt-6 inline-block">
          <span className="font-body text-sm uppercase tracking-wide text-[var(--ink)] underline underline-offset-4">
            Back to Shop
          </span>
        </button>
      </div>
    );
  }

  const gallery = [product.image, product.secondaryImage].filter(Boolean);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, qty, color);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-24 sm:px-8 sm:pb-14 sm:pt-28 lg:px-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="font-body mb-8 flex flex-wrap items-center gap-1.5 text-[12px] text-[var(--clay)]">
        <Link to="/" className="focus-ring hover:text-[var(--ink)]">
          Home
        </Link>
        <ChevronRight size={12} strokeWidth={1.5} />
        <Link to={`/?category=${encodeURIComponent(product.category)}`} className="focus-ring hover:text-[var(--ink)]">
          {product.category}
        </Link>
        <ChevronRight size={12} strokeWidth={1.5} />
        <span className="text-[var(--ink)]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div>
          <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--sand)]/30">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-3">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(src)}
                  aria-label={`Show image ${i + 1} of ${product.name}`}
                  aria-pressed={activeImage === src}
                  className={
                    "focus-ring h-20 w-16 shrink-0 overflow-hidden border transition-all " +
                    (activeImage === src ? "border-[var(--ink)]" : "border-[var(--line)] opacity-70 hover:opacity-100")
                  }
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="lg:pt-2">
          <p className="font-body text-[11px] uppercase tracking-[0.1em] text-[var(--clay)]">{product.category}</p>
          <h1 className="font-display mt-2 text-[32px] leading-tight text-[var(--ink)] sm:text-[38px]">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-2">
            <RatingStars rating={product.rating} />
            <span className="font-body text-xs text-[var(--clay)]">{product.rating.toFixed(1)} rating</span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="font-display text-2xl text-[var(--ink)]">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="font-body text-base text-[var(--clay)] line-through">{formatPrice(product.oldPrice)}</span>
            )}
            {product.oldPrice && (
              <span className="font-body bg-[var(--ink)] px-2 py-1 text-[10px] uppercase tracking-wider text-[var(--paper)]">
                Save {Math.round(100 - (product.price / product.oldPrice) * 100)}%
              </span>
            )}
          </div>
          <p className="font-body mt-6 max-w-md text-[15px] leading-relaxed text-[var(--charcoal)]/85">
            {product.description}
          </p>

          {product.colors?.length > 0 && (
            <div className="mt-7">
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
                      "focus-ring h-8 w-8 rounded-full border transition-all " +
                      (color === c ? "border-[var(--ink)] ring-1 ring-[var(--ink)] ring-offset-2" : "border-[var(--line)]")
                    }
                    style={{ backgroundColor: swatchColor(c) }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-7 flex items-center gap-4">
            <p className="font-body text-[11px] uppercase tracking-[0.1em] text-[var(--clay)]">Quantity</p>
            <div className="flex items-center border border-[var(--line)]">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="focus-ring flex h-10 w-10 items-center justify-center"
              >
                <Minus size={14} strokeWidth={1.5} />
              </button>
              <span className="font-body w-9 text-center text-sm" aria-live="polite">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="focus-ring flex h-10 w-10 items-center justify-center"
              >
                <Plus size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <PrimaryButton className="flex-1 sm:flex-none sm:min-w-[220px]" onClick={handleAddToCart}>
              <AnimatePresence mode="wait">
                {justAdded ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={15} strokeWidth={2} /> Added
                  </motion.span>
                ) : (
                  <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </PrimaryButton>
            <button
              onClick={() => toggleWishlist(product)}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={wishlisted}
              className="focus-ring flex h-[52px] w-[52px] shrink-0 items-center justify-center border border-[var(--line)]"
            >
              <Heart size={18} strokeWidth={1.5} className={wishlisted ? "fill-[var(--ink)] text-[var(--ink)]" : ""} />
            </button>
          </div>

          <dl className="mt-10 grid grid-cols-1 gap-4 border-t border-[var(--line)] pt-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <Truck size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--clay)]" />
              <div>
                <dt className="font-body text-xs font-medium text-[var(--ink)]">Complimentary Shipping</dt>
                <dd className="font-body mt-0.5 text-xs text-[var(--charcoal)]/70">On orders over $350</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--clay)]" />
              <div>
                <dt className="font-body text-xs font-medium text-[var(--ink)]">30-Day Returns</dt>
                <dd className="font-body mt-0.5 text-xs text-[var(--charcoal)]/70">Easy, free exchanges</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--clay)]" />
              <div>
                <dt className="font-body text-xs font-medium text-[var(--ink)]">Made to Last</dt>
                <dd className="font-body mt-0.5 text-xs text-[var(--charcoal)]/70">Quality guarantee</dd>
              </div>
            </div>
          </dl>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-24">
          <Eyebrow>You May Also Like</Eyebrow>
          <h2 className="font-display mt-3 text-[28px] text-[var(--ink)] sm:text-[32px]">More from {product.category}</h2>
          <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={setQuickViewProduct}
                onAddToCart={(item) => addToCart(item, 1)}
                isWishlisted={isWishlisted(p.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
