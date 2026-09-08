import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import { TESTIMONIALS } from "../lib/data";
import { Eyebrow } from "./ui/Eyebrow";
import { RatingStars } from "./ui/RatingStars";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];
  const go = (dir) => setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow className="justify-center">In Their Words</Eyebrow>
        <div className="relative mt-8 min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <RatingStars rating={t.rating} size={13} />
              <p className="font-display mt-5 text-[22px] leading-snug text-[var(--ink)] sm:text-[26px]">
                “{t.quote}”
              </p>
              <p className="font-body mt-5 text-sm text-[var(--clay)]">
                {t.name} — {t.context}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex items-center justify-center gap-6">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="focus-ring flex h-9 w-9 items-center justify-center border border-[var(--line)]">
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>
          <div className="flex gap-1.5">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                className={cn("h-1.5 w-1.5 rounded-full transition-all", i === index ? "w-4 bg-[var(--ink)]" : "bg-[var(--line)]")}
              />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next testimonial" className="focus-ring flex h-9 w-9 items-center justify-center border border-[var(--line)]">
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
