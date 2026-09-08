import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "../lib/utils";
import { Eyebrow } from "./ui/Eyebrow";
import { PrimaryButton } from "./ui/Buttons";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | success

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setStatus("error");
      return;
    }
    setStatus("success");
  };

  return (
    <section className="bg-[var(--ink)] py-20 sm:py-24">
      <div className="mx-auto max-w-lg px-5 text-center sm:px-8">
        <Eyebrow className="justify-center text-[var(--sand)]">Correspondence</Eyebrow>
        <h2 className="font-display mt-4 text-[28px] text-[var(--paper)] sm:text-[32px]">
          Notes from the studio, occasionally.
        </h2>
        <p className="font-body mt-3 text-sm text-[var(--paper)]/65">
          New arrivals, restocks, and the occasional essay. No noise.
        </p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-7 flex items-center justify-center gap-2 border border-[var(--paper)]/25 py-3.5 font-body text-sm text-[var(--paper)]"
            >
              <Check size={15} strokeWidth={2} /> You&apos;re on the list.
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-7"
              noValidate
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="your@email.com"
                  aria-invalid={status === "error"}
                  aria-describedby={status === "error" ? "newsletter-error" : undefined}
                  className={cn(
                    "focus-ring font-body flex-1 border bg-transparent px-4 py-3.5 text-sm text-[var(--paper)] placeholder:text-[var(--paper)]/40",
                    status === "error" ? "border-[#c17a5c]" : "border-[var(--paper)]/25"
                  )}
                />
                <PrimaryButton
                  type="submit"
                  className="justify-center bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--sand)]"
                >
                  Subscribe
                </PrimaryButton>
              </div>
              {status === "error" && (
                <p id="newsletter-error" className="font-body mt-2 text-left text-xs text-[#c17a5c] sm:text-center">
                  Please enter a valid email address.
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
