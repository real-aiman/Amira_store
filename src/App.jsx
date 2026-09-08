import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { StoreProvider, useStore } from "./context/StoreContext";

import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { SearchOverlay } from "./components/SearchOverlay";
import { Footer } from "./components/Footer";
import { QuickViewModal } from "./components/QuickViewModal";
import { CartDrawer } from "./components/CartDrawer";
import { WishlistDrawer } from "./components/WishlistDrawer";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";

function AppShell() {
  const {
    products,
    cart,
    wishlist,
    cartCount,
    subtotal,
    shippingCost,
    increaseQty,
    decreaseQty,
    removeFromCart,
    toggleWishlist,
    moveWishlistToCart,
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    isWishlisted,
    searchOpen,
    setSearchOpen,
    cartOpen,
    setCartOpen,
    openCart,
    wishlistOpen,
    setWishlistOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useStore();

  return (
    <div className="min-h-screen bg-[var(--paper)] font-body text-[var(--ink)] antialiased">
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={openCart}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenMenu={() => setMobileMenuOpen(true)}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
      />

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenCart={openCart}
        wishlistCount={wishlist.length}
        cartCount={cartCount}
      />

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} products={products} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
        isWishlisted={quickViewProduct ? isWishlisted(quickViewProduct.id) : false}
        onToggleWishlist={toggleWishlist}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeFromCart}
        subtotal={subtotal}
        shippingCost={shippingCost}
      />

      <WishlistDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onRemove={toggleWishlist}
        onAddToCart={moveWishlistToCart}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}>
      <ToastProvider>
        <StoreProvider>
          <AppShell />
        </StoreProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
