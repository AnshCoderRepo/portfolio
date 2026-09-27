"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles, Clock, Calendar, Check, Flame, Zap } from "lucide-react";
import RevealSection from "@/components/ui/reveal-section";
import Link from "next/link";

// Target: Sunday, September 27, 2026 at 23:59:59 (End of launch day)
const TARGET_DATE = new Date("2026-09-27T23:59:59");

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

function getTimeLeft(): TimeLeft {
  const diff = TARGET_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  // Calculate total cumulative hours (from current time to Sep 27, 2026)
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds, isComplete: false };
}

function AnimatedDigit({ value }: { value: number }) {
  return (
    <div className="relative h-[1em] px-1 overflow-hidden min-w-[1.25em] flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 sm:px-7 sm:py-5 min-w-[85px] sm:min-w-[120px] shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="font-mono text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          <AnimatedDigit value={value} />
        </span>
      </div>
      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/50 font-mono">
        {label}
      </span>
    </div>
  );
}

const emptySubscribe = () => () => {};

export function CountdownBanner() {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [time, setTime] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null;

  // Google Calendar Link generator for Sunday, September 27, 2026
  const calendarEventUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "ASSolutions Service Launch Day"
  )}&dates=20260927T000000Z/20260927T235959Z&details=${encodeURIComponent(
    "ASSolutions official freelance studio & service launch. Visit https://assolutions.dev"
  )}&location=${encodeURIComponent("https://assolutions.dev")}`;

  return (
    <section className="relative w-full px-4 py-16 sm:py-24 md:py-32 overflow-hidden flex items-center justify-center min-h-[600px] bg-background">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[700px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] -top-1/4 -left-1/4" />
        <div className="absolute w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] bottom-0 right-0" />
      </div>

      <RevealSection direction="up" className="relative w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl border border-white/10 bg-[#090D16]/90 backdrop-blur-2xl p-8 sm:p-12 md:p-16 flex flex-col items-center gap-8 md:gap-10 text-center shadow-2xl overflow-hidden"
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />

          {/* Header Info */}
          <div className="flex flex-col items-center gap-4 relative z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Service Launch · Sunday, 27 September 2026</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {time.isComplete ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  🎉 We Are Officially Live!
                </span>
              ) : (
                <>
                  The Final Countdown to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                    Launch Day.
                  </span>
                </>
              )}
            </h2>

            <p className="text-white/65 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
              {time.isComplete
                ? "Our client sprint booking queue is now officially open worldwide. Reserve your product sprint now."
                : "Real-time countdown in total hours, minutes, and seconds to Sunday, September 27, 2026. Secure your priority sprint spot before launch slots fill up."}
            </p>
          </div>

          {/* Real Time Countdown Display: Total Hours : Minutes : Seconds */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 relative z-10">
            <TimeUnit value={time.hours} label="Hours" />
            <div className="flex flex-col items-center justify-center pb-5 sm:pb-6">
              <span className="text-xl sm:text-3xl md:text-4xl font-light text-white/30 animate-pulse">:</span>
            </div>
            <TimeUnit value={time.minutes} label="Minutes" />
            <div className="flex flex-col items-center justify-center pb-5 sm:pb-6">
              <span className="text-xl sm:text-3xl md:text-4xl font-light text-white/30 animate-pulse">:</span>
            </div>
            <TimeUnit value={time.seconds} label="Seconds" />
          </div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto relative z-10 pt-2"
          >
            <a
              href="#estimator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-semibold text-sm sm:text-base hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95"
            >
              <Zap className="w-4 h-4 fill-current text-black" />
              <span>Reserve Sprint Slot — Instant Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={calendarEventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl glass border border-white/10 text-white font-medium text-sm sm:text-base hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Add Sept 27 to Calendar</span>
            </a>
          </motion.div>
        </motion.div>
      </RevealSection>
    </section>
  );
}
