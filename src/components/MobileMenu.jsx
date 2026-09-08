import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X, Search, Heart, ShoppingBag } from "lucide-react";
import { useLockBodyScroll, useEscapeKey } from "../lib/hooks";
import { NAV_LINKS } from "../lib/data";
import logoMark from "../assets/amira-mark.png";

const MotionLink = motion(Link);

export function MobileMenu({ open, onClose, onOpenSearch, onOpenWishlist, onOpenCart, wishlistCount, cartCount }) {
  useLockBodyScroll(open);
  useEscapeKey(onClose, open);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[var(--ink)]/40 backdrop-blur-[2px] md:hidden"
            onClick={onClose}
          />
          <motion.div
            key="panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 left-0 z-[61] flex w-[86%] max-w-sm flex-col overflow-y-auto bg-[var(--paper)] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="flex items-center gap-2">
                <img src={logoMark} alt="" className="h-7 w-auto object-contain" />
                <span className="font-display text-lg tracking-[0.08em]">AMIRA</span>
              </span>
              <button onClick={onClose} aria-label="Close menu" className="focus-ring flex h-9 w-9 items-center justify-center">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-6 pt-4">
              {NAV_LINKS.map((link, i) => (
                <MotionLink
                  key={link.label}
                  to={link.to}
                  onClick={onClose}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.35 }}
                  className="font-display border-b border-[var(--line)] py-4 text-2xl text-[var(--ink)]"
                >
                  {link.label}
                </MotionLink>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 border-t border-[var(--line)] px-6 py-6">
              <button
                onClick={() => {
                  onOpenSearch();
                  onClose();
                }}
                className="focus-ring flex items-center gap-3 py-2 font-body text-sm text-[var(--ink)]"
              >
                <Search size={17} strokeWidth={1.5} /> Search
              </button>
              <button
                onClick={() => {
                  onOpenWishlist();
                  onClose();
                }}
                className="focus-ring flex items-center gap-3 py-2 font-body text-sm text-[var(--ink)]"
              >
                <Heart size={17} strokeWidth={1.5} /> Wishlist ({wishlistCount})
              </button>
              <button
                onClick={() => {
                  onOpenCart();
                  onClose();
                }}
                className="focus-ring flex items-center gap-3 py-2 font-body text-sm text-[var(--ink)]"
              >
                <ShoppingBag size={17} strokeWidth={1.5} /> Bag ({cartCount})
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
