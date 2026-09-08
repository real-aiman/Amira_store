import React from "react";
import { motion } from "framer-motion";
import { Eyebrow } from "./ui/Eyebrow";
import { UnderlineLink } from "./ui/Buttons";

export function StorySection() {
  return (
    <section id="story" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7 md:pr-10 lg:col-span-6"
        >
          <Eyebrow>The House</Eyebrow>
          <h2 className="font-display mt-4 max-w-lg text-[32px] leading-[1.15] text-[var(--ink)] sm:text-[40px]">
            We make fewer things, and we make them properly.
          </h2>
          <p className="font-body mt-6 max-w-md text-[15px] leading-relaxed text-[var(--charcoal)]/85">
            AMIRA began as a rejection of the seasonal churn — a belief that
            clothing could be designed once, made well, and worn for years
            rather than months. Every material is chosen for how it ages, not
            just how it photographs.
          </p>
          <UnderlineLink href="#about" className="mt-8 inline-block text-[var(--ink)]">
            Read the Full Story
          </UnderlineLink>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 lg:col-span-6"
        >
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
            alt="Detail of hand-finished fabric in the AMIRA atelier"
            className="aspect-[4/5] w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
