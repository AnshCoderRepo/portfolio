"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Sparkles,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Layers,
  TrendingUp,
  Activity,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { siteConfig } from "@/config/site";

export default function Hero({ children }: { children?: React.ReactNode }) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-28 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden"
    >
      {/* Optional Navbar / Top Slot */}
      {children}

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[450px] sm:w-[550px] h-[450px] sm:h-[550px] bg-cyan-500/10 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-blue-600/10 rounded-full blur-[130px] -z-10 pointer-events-none" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Bio, and CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 relative z-10"
          >
            {/* Availability / Status Pill */}
            <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full glass border border-white/10 shadow-lg shadow-black/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium tracking-wide text-white/90 uppercase">
                Open to Software Engineering & Freelance Projects
              </span>
            </div>

            {/* Main Heading & Subheadings */}
            <div className="space-y-4 sm:space-y-5">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
                Building reliable software,
                <br />
                <span className="text-white/40">from frontend to backend.</span>
              </h1>

              <p className="text-sm sm:text-base font-semibold text-cyan-400 uppercase tracking-wider">
                Software Engineer • Full Stack Developer • Solutions Architect
              </p>

              <p className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed font-light">
                Specialized in converting real-world client visions into robust web systems,
                scalable REST APIs, modern digital experiences, and high-performance server architectures.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/projects"
                className="px-7 py-3.5 bg-white text-black font-medium text-sm sm:text-base rounded-xl hover:bg-white/90 transition-all flex items-center justify-center space-x-2 group shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:-translate-y-0.5"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="px-7 py-3.5 glass text-white font-medium text-sm sm:text-base rounded-xl flex items-center justify-center space-x-2 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Let&apos;s Connect</span>
              </Link>
            </div>

            {/* Social Connect Footer */}
            <div className="flex items-center space-x-6 pt-6 border-t border-white/10">
              <span className="text-xs text-white/50 font-medium uppercase tracking-wider">
                Connect
              </span>
              <div className="flex items-center space-x-4">
                <a
                  href={siteConfig.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-cyan-400 hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-cyan-400 hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-cyan-400 hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <FaXTwitter className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-white/50 hover:text-cyan-400 hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Converting Engineering & Delivery Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:pl-4 z-10 w-full"
          >
            <div className="rounded-3xl border border-white/10 bg-surface/60 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
              
              {/* Card Header with Status */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Full-Stack Sprint Engine</h3>
                    <p className="text-[11px] text-white/50">Production Architecture Standards</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Core Metric Highlights Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-1">
                  <div className="flex items-center justify-between text-white/50 text-xs">
                    <span>Performance</span>
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white">100/100</div>
                  <p className="text-[10px] text-white/40">Lighthouse Core Web Vitals</p>
                </div>

                <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-1">
                  <div className="flex items-center justify-between text-white/50 text-xs">
                    <span>Turnaround</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">14 Days</div>
                  <p className="text-[10px] text-white/40">Concept to Live MVP Launch</p>
                </div>

                <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-1">
                  <div className="flex items-center justify-between text-white/50 text-xs">
                    <span>API Latency</span>
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-black text-white">&lt;120ms</div>
                  <p className="text-[10px] text-white/40">Edge Cached & Optimized</p>
                </div>

                <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-1">
                  <div className="flex items-center justify-between text-white/50 text-xs">
                    <span>Code Quality</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-black text-white">100%</div>
                  <p className="text-[10px] text-white/40">TypeScript & Test Coverage</p>
                </div>
              </div>

              {/* Deliverable Checkmarks */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2.5 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Bespoke Next.js 16 App Router & Tailwind CSS v4</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AI & LLM Integration (RAG Pipelines, Custom Agents)</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full IP Rights Transfer & 30-Day Post-Launch Warranty</span>
                </div>
              </div>

              {/* Direct Estimator Anchor Button */}
              <div className="pt-2">
                <a
                  href="#estimator"
                  className="flex items-center justify-center space-x-2 w-full py-3.5 px-4 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-semibold text-xs sm:text-sm transition-all"
                >
                  <Layers className="w-4 h-4" />
                  <span>Calculate Custom Project Scope & Cost</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
