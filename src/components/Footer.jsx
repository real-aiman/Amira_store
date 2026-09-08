import React from "react";
import { InstagramIcon, TwitterIcon, FacebookIcon } from "./ui/SocialIcons";
import { FOOTER_COLUMNS } from "../lib/data";
import logoFull from "../assets/amira-logo-full.png";

export function Footer() {
  return (
    <footer id="about" className="border-t border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-5">
          <div className="col-span-2 pr-6 md:col-span-2">
            <img
              src={logoFull}
              alt="AMIRA Shopping Store"
              className="h-20 w-auto object-contain object-left sm:h-24"
            />
            <p className="font-body mt-4 max-w-[240px] text-[13px] leading-relaxed text-[var(--charcoal)]/70">
              Considered clothing and objects, designed in small batches for a
              slower kind of living.
            </p>
            <div className="mt-6 flex items-center gap-4 text-[var(--charcoal)]">
              <a href="#" aria-label="AMIRA on Instagram" className="focus-ring hover:text-[var(--clay)]">
                <InstagramIcon size={17} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="AMIRA on Twitter" className="focus-ring hover:text-[var(--clay)]">
                <TwitterIcon size={17} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="AMIRA on Facebook" className="focus-ring hover:text-[var(--clay)]">
                <FacebookIcon size={17} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-[11px] uppercase tracking-[0.15em] text-[var(--clay)]">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="focus-ring font-body text-[13px] text-[var(--charcoal)]/80 hover:text-[var(--ink)]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs text-[var(--charcoal)]/60">© 2026 AMIRA Studio. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="font-body text-xs text-[var(--charcoal)]/60 hover:text-[var(--ink)]">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-xs text-[var(--charcoal)]/60 hover:text-[var(--ink)]">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
