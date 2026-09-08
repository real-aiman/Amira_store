import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { Hero } from "../components/Hero";
import { ProductSection } from "../components/ProductSection";
import { StorySection } from "../components/StorySection";
import { Lookbook } from "../components/Lookbook";
import { Testimonials } from "../components/Testimonials";
import { Newsletter } from "../components/Newsletter";

export default function Home() {
  const location = useLocation();
  const {
    products,
    loading,
    error,
    retryLoad,
    setQuickViewProduct,
    addToCart,
    wishlist,
    toggleWishlist,
  } = useStore();

  // Scroll to the right section when arriving via a nav link (e.g. /#shop)
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        window.setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location.hash]);

  const initialCategory = new URLSearchParams(location.search).get("category");

  return (
    <>
      <Hero />
      <ProductSection
        products={products}
        loading={loading}
        error={error}
        onRetry={retryLoad}
        onQuickView={setQuickViewProduct}
        onAddToCart={(p) => addToCart(p, 1)}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
        initialCategory={initialCategory || "All"}
      />
      <StorySection />
      <Lookbook />
      <Testimonials />
      <Newsletter />
    </>
  );
}
