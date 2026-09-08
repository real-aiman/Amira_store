import React from "react";
import { Link } from "react-router-dom";
import { Menu, Search, Heart, ShoppingBag } from "lucide-react";
import { cn } from "../lib/utils";
import { useScrolled } from "../lib/hooks";
import { NAV_LINKS } from "../lib/data";
import { UnderlineLink, IconButton } from "./ui/Buttons";
import logoMark from "../assets/amira-mark.png";

export function Navbar({ onOpenSearch, onOpenCart, onOpenWishlist, onOpenMenu, cartCount, wishlistCount }) {
  const scrolled = useScrolled(40);
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div
        className={cn(
          "relative mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:px-12",
          scrolled ? "py-3.5" : "py-6"
        )}
      >
        <button
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="focus-ring flex h-9 w-9 items-center justify-center md:hidden"
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <UnderlineLink key={link.label} to={link.to}>
              {link.label}
            </UnderlineLink>
          ))}
        </nav>

        <Link
          to="/"
          aria-label="AMIRA Shopping Store — Home"
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 md:static md:translate-x-0"
        >
          <img
            src={logoMark}
            alt=""
            className="h-8 w-auto object-contain transition-all duration-500 sm:h-9"
          />
          <span className="font-display text-[20px] font-medium tracking-[0.08em] text-[var(--ink)] sm:text-[22px]">
            AMIRA
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <IconButton label="Search" onClick={onOpenSearch}>
            <Search size={19} strokeWidth={1.5} />
          </IconButton>
          <IconButton label="Wishlist" onClick={onOpenWishlist} badge={wishlistCount} className="hidden sm:flex">
            <Heart size={19} strokeWidth={1.5} />
          </IconButton>
          <IconButton label="Shopping bag" onClick={onOpenCart} badge={cartCount}>
            <ShoppingBag size={19} strokeWidth={1.5} />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
