"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Video, X } from "lucide-react";

export default function BookACall() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-accent-color/20 bg-accent-color/10 px-4 py-3 text-sm font-medium text-accent-color backdrop-blur-sm transition-all hover:border-accent-color/40 hover:bg-accent-color/20"
      >
        <Calendar className="h-4 w-4" />
        <span className="hidden sm:inline">Book a Call</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 z-[101] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-surface-border bg-surface p-6 shadow-2xl sm:p-8"
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-surface-border text-text-secondary transition-colors hover:bg-surface-alt hover:text-accent-color"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-accent-color">Book a Call</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  Schedule a free 30-minute consultation to discuss your project.
                </p>
              </div>

              {/* Available slots */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-alt p-4 transition-colors hover:border-accent-color/20 hover:bg-surface-alt">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-color/10">
                    <Calendar className="h-5 w-5 text-accent-color" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-accent-color">Tomorrow</div>
                    <div className="text-xs text-text-secondary">Multiple slots available</div>
                  </div>
                  <div className="text-xs text-text-secondary">
                    <Clock className="mr-1 inline h-3 w-3" />
                    30 min
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-alt p-4 transition-colors hover:border-accent-color/20 hover:bg-surface-alt">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-color/10">
                    <Video className="h-5 w-5 text-accent-color" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-accent-color">This Week</div>
                    <div className="text-xs text-text-secondary">Mon - Fri, 9 AM - 6 PM</div>
                  </div>
                  <div className="text-xs text-text-secondary">
                    <Clock className="mr-1 inline h-3 w-3" />
                    30 min
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/assolutions"}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl bg-accent-color py-3 text-center text-sm font-semibold text-background transition-all hover:shadow-[0_0_30px_rgba(225,224,204,0.3)]"
              >
                Schedule on Calendly
              </a>

              <p className="mt-4 text-center text-xs text-text-secondary">
                Or email us at{" "}
                <a
                  href="mailto:hello@assolutions.dev"
                  className="text-accent-color/60 underline hover:text-accent-color"
                >
                  hello@assolutions.dev
                </a>
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
