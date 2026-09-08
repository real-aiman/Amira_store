import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Package } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { formatPrice } from "../lib/utils";
import { Eyebrow } from "../components/ui/Eyebrow";
import { PrimaryButton } from "../components/ui/Buttons";

export default function OrderConfirmation() {
  const { orderNumber } = useParams();
  const { lastOrder } = useStore();

  const order = lastOrder && lastOrder.orderNumber === orderNumber ? lastOrder : null;

  if (!order) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-[1440px] flex-col items-center justify-center px-5 pt-24 text-center sm:px-8 lg:px-12">
        <h1 className="font-display text-2xl text-[var(--ink)]">Order details unavailable</h1>
        <p className="font-body mt-3 max-w-sm text-sm text-[var(--charcoal)]/70">
          We couldn&apos;t find that order in this session. If you just placed it, check your inbox for confirmation.
        </p>
        <Link to="/" className="focus-ring mt-6 font-body text-sm uppercase tracking-wide text-[var(--ink)] underline underline-offset-4">
          Back to Home
        </Link>
      </div>
    );
  }

  const { shipping, contact, payment } = order.details;

  return (
    <div className="mx-auto max-w-[720px] px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--paper)]">
          <Check size={24} strokeWidth={2} />
        </div>
        <Eyebrow className="mt-6 justify-center">Order Confirmed</Eyebrow>
        <h1 className="font-display mt-3 text-[32px] text-[var(--ink)] sm:text-[38px]">Thank you, {shipping.fullName.split(" ")[0]}.</h1>
        <p className="font-body mt-3 max-w-md text-sm text-[var(--charcoal)]/70">
          Your order has been placed. A confirmation has been sent to {contact.email}. This is a
          portfolio demo — no real payment was processed.
        </p>
        <p className="font-body mt-5 text-xs uppercase tracking-[0.15em] text-[var(--clay)]">
          Order Number — {order.orderNumber}
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h2 className="font-body text-[11px] uppercase tracking-[0.1em] text-[var(--clay)]">Shipping To</h2>
          <address className="font-body mt-2 text-sm not-italic leading-relaxed text-[var(--charcoal)]">
            {shipping.fullName}<br />
            {shipping.address1}{shipping.address2 ? `, ${shipping.address2}` : ""}<br />
            {shipping.city}, {shipping.state} {shipping.zip}<br />
            {shipping.country}
          </address>
        </div>
        <div>
          <h2 className="font-body text-[11px] uppercase tracking-[0.1em] text-[var(--clay)]">Payment</h2>
          <p className="font-body mt-2 text-sm text-[var(--charcoal)]">
            Card ending in {payment.last4}
          </p>
          <h2 className="font-body mt-5 text-[11px] uppercase tracking-[0.1em] text-[var(--clay)]">Contact</h2>
          <p className="font-body mt-2 text-sm text-[var(--charcoal)]">{contact.email}</p>
          <p className="font-body text-sm text-[var(--charcoal)]">{contact.phone}</p>
        </div>
      </div>

      <div className="mt-10 border-t border-[var(--line)] pt-8">
        <h2 className="flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.1em] text-[var(--clay)]">
          <Package size={14} strokeWidth={1.5} /> Items ({order.items.reduce((s, i) => s + i.qty, 0)})
        </h2>
        <ul className="mt-4 divide-y divide-[var(--line)]">
          {order.items.map((item) => (
            <li key={`${item.id}-${item.color}`} className="flex items-center gap-4 py-4">
              <img src={item.image} alt={item.name} className="h-16 w-14 shrink-0 object-cover" />
              <div className="flex-1">
                <p className="font-body text-sm text-[var(--ink)]">{item.name}</p>
                <p className="font-body text-xs text-[var(--clay)]">
                  {item.color ? `${item.color} · ` : ""}Qty {item.qty}
                </p>
              </div>
              <span className="font-body text-sm text-[var(--ink)]">{formatPrice(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-2 border-t border-[var(--line)] pt-4 font-body text-sm text-[var(--charcoal)]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? "Complimentary" : formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between border-t border-[var(--line)] pt-2 font-medium text-[var(--ink)]">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Link to="/">
          <PrimaryButton>Continue Shopping</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
