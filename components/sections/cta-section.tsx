"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MessageSquare, Calendar, ShieldCheck, Zap } from "lucide-react";
import RevealSection from "@/components/ui/reveal-section";
import { siteConfig } from "@/config/site";

export default function CtaSection() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappPhone}?text=${encodeURIComponent(
    siteConfig.contact.whatsappMessage
  )}`;

  return (
    <section className="relative w-full py-20 sm:py-32 overflow-hidden bg-background">
      {/* Ambient Radial Lighting */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] -top-1/4 -left-1/4" />
        <div className="absolute w-[600px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] bottom-0 right-0" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <RevealSection direction="up" className="relative">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] via-[#090D16]/80 to-[#030611]/90 backdrop-blur-2xl p-8 sm:p-14 md:p-16 text-center shadow-2xl overflow-hidden">
            {/* Top Accent Gradient Border Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ready for High-Impact Execution</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-3xl mx-auto">
              Let&apos;s Build Your Next{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                Breakthrough Product.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-neutral-300/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10">
              Whether you need end-to-end fullstack development, intelligent AI agent workflows, or high-performance cloud architectures, NSSolutions turns complex technical requirements into production-ready reality.
            </p>

            {/* Feature Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10 text-xs sm:text-sm text-neutral-300 font-mono">
              <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-full px-4 py-1.5">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Rapid Turnaround</span>
              </div>
              <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-full px-4 py-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Production-Grade Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-full px-4 py-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Direct Engineer Access</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm sm:text-base shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white/[0.05] border border-white/10 text-white hover:bg-white/[0.1] hover:border-white/20 transition-all text-sm sm:text-base font-medium"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Instant WhatsApp</span>
              </a>
            </div>

            {/* Subtle note */}
            <p className="mt-8 text-xs text-neutral-400 font-mono">
              Typical response time: under 2 hours · Free initial architectural review
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
