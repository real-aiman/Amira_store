import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, ChevronRight } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { formatPrice } from "../lib/utils";
import { Eyebrow } from "../components/ui/Eyebrow";
import { FormField } from "../components/ui/FormField";
import { PrimaryButton } from "../components/ui/Buttons";

const COUNTRIES = ["United States", "Canada", "United Kingdom", "Australia", "Pakistan", "India", "United Arab Emirates"];

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, shippingCost, orderTotal, placeOrder } = useStore();

  const [form, setForm] = useState({
    email: "",
    phone: "",
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (field) => (e) => {
    let value = e.target.value;
    if (field === "cardNumber") value = formatCardNumber(value);
    if (field === "expiry") value = formatExpiry(value);
    if (field === "cvv") value = value.replace(/\D/g, "").slice(0, 4);
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 7)
      e.phone = "Enter a valid phone number.";
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.address1.trim()) e.address1 = "Address is required.";
    if (!form.city.trim()) e.city = "City is required.";
    if (!form.state.trim()) e.state = "State / province is required.";
    if (!form.zip.trim()) e.zip = "ZIP / postal code is required.";
    if (!form.nameOnCard.trim()) e.nameOnCard = "Name on card is required.";
    if (form.cardNumber.replace(/\s/g, "").length !== 16) e.cardNumber = "Enter a valid 16-digit card number.";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = "Use MM/YY format.";
    if (form.cvv.length < 3) e.cvv = "Enter a valid CVV.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      document.getElementById("checkout-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      const orderNumber = placeOrder({
        contact: { email: form.email, phone: form.phone },
        shipping: {
          fullName: form.fullName,
          address1: form.address1,
          address2: form.address2,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: form.country,
        },
        payment: { last4: form.cardNumber.replace(/\s/g, "").slice(-4) },
      });
      navigate(`/order-confirmation/${orderNumber}`);
    }, 900);
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-[1440px] flex-col items-center justify-center px-5 pt-24 text-center sm:px-8 lg:px-12">
        <h1 className="font-display text-2xl text-[var(--ink)]">Your bag is empty</h1>
        <p className="font-body mt-3 text-sm text-[var(--charcoal)]/70">Add something you love before checking out.</p>
        <Link to="/" className="focus-ring mt-6 font-body text-sm uppercase tracking-wide text-[var(--ink)] underline underline-offset-4">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-10 pt-24 sm:px-8 sm:pb-14 sm:pt-28 lg:px-12">
      <nav aria-label="Breadcrumb" className="font-body mb-8 flex items-center gap-1.5 text-[12px] text-[var(--clay)]">
        <Link to="/" className="focus-ring hover:text-[var(--ink)]">Home</Link>
        <ChevronRight size={12} strokeWidth={1.5} />
        <span className="text-[var(--ink)]">Checkout</span>
      </nav>

      <form id="checkout-form" onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
        <div>
          <section>
            <Eyebrow>Contact</Eyebrow>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField id="email" label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={setField("email")} error={errors.email} containerClassName="sm:col-span-2" />
              <FormField id="phone" label="Phone" type="tel" placeholder="(555) 123-4567" value={form.phone} onChange={setField("phone")} error={errors.phone} containerClassName="sm:col-span-2" />
            </div>
          </section>

          <section className="mt-10">
            <Eyebrow>Shipping Address</Eyebrow>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField id="fullName" label="Full Name" placeholder="Jane Doe" value={form.fullName} onChange={setField("fullName")} error={errors.fullName} containerClassName="sm:col-span-2" />
              <FormField id="address1" label="Address" placeholder="123 Main Street" value={form.address1} onChange={setField("address1")} error={errors.address1} containerClassName="sm:col-span-2" />
              <FormField id="address2" label="Apartment, suite, etc. (optional)" value={form.address2} onChange={setField("address2")} containerClassName="sm:col-span-2" />
              <FormField id="city" label="City" value={form.city} onChange={setField("city")} error={errors.city} />
              <FormField id="state" label="State / Province" value={form.state} onChange={setField("state")} error={errors.state} />
              <FormField id="zip" label="ZIP / Postal Code" value={form.zip} onChange={setField("zip")} error={errors.zip} />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="country" className="font-body text-[11px] uppercase tracking-[0.1em] text-[var(--clay)]">
                  Country
                </label>
                <select
                  id="country"
                  value={form.country}
                  onChange={setField("country")}
                  className="focus-ring font-body border border-[var(--line)] bg-transparent px-3.5 py-3 text-sm text-[var(--ink)]"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <div className="flex items-center gap-2">
              <Lock size={14} strokeWidth={1.5} className="text-[var(--clay)]" />
              <Eyebrow>Payment</Eyebrow>
            </div>
            <p className="font-body mt-2 text-xs text-[var(--charcoal)]/60">
              This is a portfolio demo — no real payment is processed and no card data is transmitted anywhere.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField id="nameOnCard" label="Name on Card" placeholder="Jane Doe" value={form.nameOnCard} onChange={setField("nameOnCard")} error={errors.nameOnCard} containerClassName="sm:col-span-2" />
              <FormField id="cardNumber" label="Card Number" placeholder="1234 5678 9012 3456" inputMode="numeric" value={form.cardNumber} onChange={setField("cardNumber")} error={errors.cardNumber} containerClassName="sm:col-span-2" />
              <FormField id="expiry" label="Expiry (MM/YY)" placeholder="MM/YY" inputMode="numeric" value={form.expiry} onChange={setField("expiry")} error={errors.expiry} />
              <FormField id="cvv" label="CVV" placeholder="123" inputMode="numeric" value={form.cvv} onChange={setField("cvv")} error={errors.cvv} />
            </div>
          </section>

          <PrimaryButton type="submit" disabled={submitting} className="mt-10 w-full sm:w-auto">
            {submitting ? "Placing Order…" : `Place Order — ${formatPrice(orderTotal)}`}
          </PrimaryButton>
        </div>

        {/* Order summary */}
        <aside className="h-fit border border-[var(--line)] bg-[var(--bone)]/40 p-6">
          <Eyebrow>Order Summary</Eyebrow>
          <ul className="mt-5 space-y-4">
            {cart.map((item) => (
              <li key={`${item.id}-${item.color}`} className="flex gap-3">
                <div className="relative h-16 w-14 shrink-0">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--ink)] font-body text-[10px] text-[var(--paper)]">
                    {item.qty}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="font-body text-sm text-[var(--ink)]">{item.name}</p>
                  {item.color && <p className="font-body text-xs text-[var(--clay)]">{item.color}</p>}
                </div>
                <span className="font-body text-sm text-[var(--ink)]">{formatPrice(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 border-t border-[var(--line)] pt-4 font-body text-sm text-[var(--charcoal)]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? "Complimentary" : formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between border-t border-[var(--line)] pt-2 font-medium text-[var(--ink)]">
              <span>Total</span>
              <span>{formatPrice(orderTotal)}</span>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
