import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLockBodyScroll, useEscapeKey } from "../../lib/hooks";

export function DrawerShell({ open, onClose, title, children, ariaLabel }) {
  useLockBodyScroll(open);
  useEscapeKey(onClose, open);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] bg-[var(--ink)]/40 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className="fixed inset-y-0 right-0 z-[76] flex w-full max-w-md flex-col bg-[var(--paper)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--line)] px-6 py-5">
              <h2 className="font-display text-lg text-[var(--ink)]">{title}</h2>
              <button onClick={onClose} aria-label={`Close ${title}`} className="focus-ring flex h-9 w-9 items-center justify-center">
                <X size={19} strokeWidth={1.5} />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
