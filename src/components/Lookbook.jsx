import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import { LOOKBOOK_ITEMS } from "../lib/data";
import { Eyebrow } from "./ui/Eyebrow";

export function Lookbook() {
  return (
    <section id="lookbook" className="bg-[var(--bone)] py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <Eyebrow>Fall–Winter</Eyebrow>
            <h2 className="font-display mt-3 text-[34px] text-[var(--ink)] sm:text-[40px]">The Lookbook</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 auto-rows-[220px] gap-3 sm:auto-rows-[280px] sm:gap-4 md:h-[720px] md:grid-cols-4 md:grid-rows-2 md:auto-rows-auto">
          {LOOKBOOK_ITEMS.map((item, i) => (
            <motion.a
              key={item.id}
              href="#shop"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={cn("group relative overflow-hidden", item.span)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[var(--sand)]">{item.tag}</p>
                  <h3 className="font-display mt-1 text-lg text-[var(--paper)]">{item.title}</h3>
                </div>
                <span className="translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  <ChevronRight size={18} className="text-[var(--paper)]" strokeWidth={1.5} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
