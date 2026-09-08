import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "./ui/Eyebrow";
import { PrimaryButton, UnderlineLink } from "./ui/Buttons";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-[92vh] items-end overflow-hidden bg-[var(--ink)]">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=80"
          alt="Editorial portrait in muted tones, AMIRA autumn collection"
          className="h-[110%] w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/10 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-5 pb-16 sm:px-8 md:grid-cols-12 md:pb-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-8 lg:col-span-7"
        >
          <Eyebrow className="text-[var(--sand)]">Autumn Collection — No. 12</Eyebrow>
          <h1 className="font-display mt-4 max-w-xl text-[42px] leading-[1.05] text-[var(--paper)] sm:text-[56px] lg:text-[68px]">
            Objects designed for a slower kind of living.
          </h1>
          <p className="font-body mt-6 max-w-md text-[15px] leading-relaxed text-[var(--paper)]/75">
            Considered materials, restrained construction, and a wardrobe built to
            outlast the season it was made for.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <PrimaryButton
              onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--sand)]"
            >
              Explore Collection
            </PrimaryButton>
            <UnderlineLink href="#story" className="text-[var(--paper)] py-3">
              Discover the Story
            </UnderlineLink>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-8 right-5 z-10 hidden font-body text-xs tracking-wide text-[var(--paper)]/60 sm:right-8 md:block lg:right-12"
      >
        01 — Wool &amp; Silk / Fall–Winter
      </motion.div>
    </section>
  );
}
