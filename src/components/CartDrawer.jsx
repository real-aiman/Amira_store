import React from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { formatPrice } from "../lib/utils";
import { DrawerShell } from "./ui/DrawerShell";
import { EmptyState } from "./ui/States";
import { PrimaryButton } from "./ui/Buttons";

export function CartDrawer({ open, onClose, cart, onIncrease, onDecrease, onRemove, subtotal, shippingCost }) {
  const navigate = useNavigate();
  const total = subtotal + shippingCost;

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <DrawerShell open={open} onClose={onClose} title={`Your Bag (${cart.length})`} ariaLabel="Shopping bag">
      {cart.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag size={20} strokeWidth={1.5} />}
          title="Your bag is empty"
          message="Pieces you add will appear here."
          actionLabel="Continue Shopping"
          onAction={onClose}
        />
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-6">
            <ul className="divide-y divide-[var(--line)]">
              {cart.map((item) => (
                <li key={`${item.id}-${item.color}`} className="flex gap-4 py-5">
                  <img src={item.image} alt={item.name} className="h-24 w-20 shrink-0 object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-body text-sm text-[var(--ink)]">{item.name}</h3>
                        {item.color && <p className="font-body mt-0.5 text-xs text-[var(--clay)]">{item.color}</p>}
                      </div>
                      <button
                        onClick={() => onRemove(item)}
                        aria-label={`Remove ${item.name} from bag`}
                        className="focus-ring text-[var(--clay)] hover:text-[var(--ink)]"
                      >
                        <X size={15} strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-[var(--line)]">
                        <button
                          onClick={() => onDecrease(item)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="focus-ring flex h-7 w-7 items-center justify-center"
                        >
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span className="font-body w-6 text-center text-xs">{item.qty}</span>
                        <button
                          onClick={() => onIncrease(item)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="focus-ring flex h-7 w-7 items-center justify-center"
                        >
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                      <span className="font-body text-sm text-[var(--ink)]">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[var(--line)] px-6 py-6">
            <div className="space-y-2 font-body text-sm text-[var(--charcoal)]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Complimentary" : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-2 font-medium text-[var(--ink)]">
                <span>Estimated Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <PrimaryButton onClick={handleCheckout} className="mt-5 w-full">
              Proceed to Checkout
            </PrimaryButton>
          </div>
        </>
      )}
    </DrawerShell>
  );
}
