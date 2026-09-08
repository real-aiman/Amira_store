import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { PRODUCTS } from "../lib/data";
import { useToast } from "./ToastContext";

const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

function generateOrderNumber() {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `AM-${rand}`;
}

export function StoreProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const toast = useToast();

  const loadCollection = useCallback(() => {
    setLoading(true);
    setError(false);
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 1100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => loadCollection(), [loadCollection]);

  const retryLoad = () => loadCollection();

  const addToCart = useCallback(
    (product, qty = 1, color = product.colors?.[0] ?? null) => {
      setCart((prev) => {
        const existing = prev.find((p) => p.id === product.id && p.color === color);
        if (existing) {
          return prev.map((p) => (p === existing ? { ...p, qty: p.qty + qty } : p));
        }
        return [...prev, { ...product, qty, color }];
      });
      toast(`${product.name} added to cart`);
    },
    [toast]
  );

  const increaseQty = useCallback((item) => {
    setCart((prev) => prev.map((p) => (p === item ? { ...p, qty: p.qty + 1 } : p)));
  }, []);

  const decreaseQty = useCallback((item) => {
    setCart((prev) =>
      prev.map((p) => (p === item ? { ...p, qty: p.qty - 1 } : p)).filter((p) => p.qty > 0)
    );
  }, []);

  const removeFromCart = useCallback(
    (item) => {
      setCart((prev) => prev.filter((p) => p !== item));
      toast(`${item.name} removed from cart`);
    },
    [toast]
  );

  const toggleWishlist = useCallback(
    (product) => {
      setWishlist((prev) => {
        const exists = prev.some((p) => p.id === product.id);
        if (exists) {
          toast(`${product.name} removed from wishlist`);
          return prev.filter((p) => p.id !== product.id);
        }
        toast(`${product.name} added to wishlist`);
        return [...prev, product];
      });
    },
    [toast]
  );

  const moveWishlistToCart = useCallback(
    (product) => {
      addToCart(product, 1);
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
    },
    [addToCart]
  );

  const openCart = useCallback(() => {
    setCartOpen(true);
  }, []);

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.qty, 0), [cart]);
  const shippingCost = useMemo(() => (subtotal > 0 && subtotal < 350 ? 18 : 0), [subtotal]);
  const orderTotal = useMemo(() => subtotal + shippingCost, [subtotal, shippingCost]);
  const isWishlisted = useCallback((id) => wishlist.some((p) => p.id === id), [wishlist]);

  // Places the order using the current cart + the details collected at checkout.
  // No real payment is processed — this is a portfolio-grade simulation.
  const placeOrder = useCallback(
    (details) => {
      const orderNumber = generateOrderNumber();
      const order = {
        orderNumber,
        placedAt: new Date().toISOString(),
        items: cart,
        subtotal,
        shipping: shippingCost,
        total: orderTotal,
        details,
      };
      setLastOrder(order);
      setCart([]);
      toast("Order confirmed — thank you.");
      return orderNumber;
    },
    [cart, subtotal, shippingCost, orderTotal, toast]
  );

  const value = {
    products: PRODUCTS,
    loading,
    error,
    retryLoad,
    cart,
    wishlist,
    isWishlisted,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    toggleWishlist,
    moveWishlistToCart,
    placeOrder,
    lastOrder,
    cartCount,
    subtotal,
    shippingCost,
    orderTotal,
    quickViewProduct,
    setQuickViewProduct,
    searchOpen,
    setSearchOpen,
    cartOpen,
    setCartOpen,
    openCart,
    wishlistOpen,
    setWishlistOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
