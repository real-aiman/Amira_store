import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "./ui/Eyebrow";
import { PrimaryButton, UnderlineLink } from "./ui/Buttons";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-[88vh] items-end overflow-hidden bg-[var(--ink)] sm:min-h-[92vh]">
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.04]">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=85"
          alt="AMIRA feminine fashion editorial"
          className="h-full w-full object-cover object-center opacity-90"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(33,23,28,.88)_0%,rgba(33,23,28,.52)_42%,rgba(33,23,28,.08)_78%),linear-gradient(0deg,rgba(33,23,28,.9)_0%,transparent_62%)]" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 md:px-10 md:pb-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--sand)]/40 bg-[var(--ink)]/25 px-3 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--rose)]" />
            <Eyebrow className="text-[var(--sand)]">The AMIRA Edit · New Season</Eyebrow>
          </div>
          <h1 className="font-display max-w-2xl text-[48px] leading-[.96] tracking-[-.02em] text-[var(--paper)] sm:text-[64px] lg:text-[78px]">
            Soft. Feminine. <span className="text-[var(--sand)]">Unforgettable.</span>
          </h1>
          <p className="font-body mt-6 max-w-lg text-[15px] leading-7 text-[var(--paper)]/80 sm:text-base">
            Curated fashion pieces made for the girl who loves beautiful details,
            effortless elegance, and a little everyday magic.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4">
            <PrimaryButton
              onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full bg-[var(--paper)] px-6 py-3 text-[var(--ink)] shadow-xl shadow-black/15 transition-all hover:-translate-y-0.5 hover:bg-[var(--sand)]"
            >
              Shop the Edit
            </PrimaryButton>
            <UnderlineLink href="#story" className="rounded-full px-3 py-3 text-[var(--paper)]">
              Our Story →
            </UnderlineLink>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-7 right-5 z-10 hidden rounded-full border border-[var(--paper)]/20 bg-[var(--ink)]/20 px-4 py-2 font-body text-[10px] uppercase tracking-[.22em] text-[var(--paper)]/70 backdrop-blur-md md:block lg:right-12"
      >
        01 · Curated for her
      </motion.div>
    </section>
  );
}
