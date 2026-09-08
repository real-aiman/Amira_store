import React from "react";
import { Heart, X } from "lucide-react";
import { formatPrice } from "../lib/utils";
import { DrawerShell } from "./ui/DrawerShell";
import { EmptyState } from "./ui/States";

export function WishlistDrawer({ open, onClose, wishlist, onRemove, onAddToCart }) {
  return (
    <DrawerShell open={open} onClose={onClose} title={`Wishlist (${wishlist.length})`} ariaLabel="Wishlist">
      {wishlist.length === 0 ? (
        <EmptyState
          icon={<Heart size={20} strokeWidth={1.5} />}
          title="Nothing saved yet"
          message="Tap the heart on any piece to save it here."
          actionLabel="Continue Browsing"
          onAction={onClose}
        />
      ) : (
        <div className="flex-1 overflow-y-auto px-6">
          <ul className="divide-y divide-[var(--line)]">
            {wishlist.map((item) => (
              <li key={item.id} className="flex gap-4 py-5">
                <img src={item.image} alt={item.name} className="h-24 w-20 shrink-0 object-cover" />
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-body text-sm text-[var(--ink)]">{item.name}</h3>
                    <button
                      onClick={() => onRemove(item)}
                      aria-label={`Remove ${item.name} from wishlist`}
                      className="focus-ring text-[var(--clay)] hover:text-[var(--ink)]"
                    >
                      <X size={15} strokeWidth={1.5} />
                    </button>
                  </div>
                  <span className="font-body mt-1 text-sm text-[var(--ink)]">{formatPrice(item.price)}</span>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="focus-ring mt-auto self-start pt-2 font-body text-xs uppercase tracking-wide text-[var(--ink)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--ink)]"
                  >
                    Move to Bag
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DrawerShell>
  );
}
