import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Eyebrow } from "./ui/Eyebrow";
import { FilterBar } from "./FilterBar";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton, ErrorState, EmptyState } from "./ui/States";

export function ProductSection({
  products,
  loading,
  error,
  onRetry,
  onQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  initialCategory = "All",
}) {
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (initialCategory && initialCategory !== "All") {
      setCategory(initialCategory);
      window.setTimeout(() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }), 80);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort((a, b) => (a.category === "New" ? -1 : 1) - (b.category === "New" ? -1 : 1));
        break;
      default:
        break;
    }
    return list;
  }, [products, category, sort, search]);

  return (
    <section id="shop" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow>Full Collection</Eyebrow>
          <h2 className="font-display mt-3 text-[34px] text-[var(--ink)] sm:text-[40px]">The Essentials Edit</h2>
        </div>
        <div className="relative w-full max-w-[260px]">
          <Search size={15} strokeWidth={1.5} className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[var(--clay)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Filter by name…"
            aria-label="Filter products by name"
            className="focus-ring font-body w-full border-b border-[var(--line)] bg-transparent py-2 pl-6 text-sm text-[var(--ink)] placeholder:text-[var(--clay)]/70"
          />
        </div>
      </div>

      <FilterBar
        activeCategory={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
        resultCount={filtered.length}
      />

      <div className="mt-10">
        {error ? (
          <ErrorState onRetry={onRetry} />
        ) : loading ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Search size={20} strokeWidth={1.5} />}
            title="No pieces found"
            message={search ? `Nothing matches “${search}”. Try another search.` : "Try a different category."}
            actionLabel="Clear filters"
            onAction={() => {
              setSearch("");
              setCategory("All");
            }}
          />
        ) : (
          <motion.div layout className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence>
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  isWishlisted={wishlist.some((w) => w.id === product.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
