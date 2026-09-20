"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
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
  Calendar,
  Terminal,
  Scale,
  Check,
  X,
  Smartphone,
  Bot,
  Globe,
  Database,
  CreditCard,
  Flame,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// Interactive Floating Physics Badge
interface FloatingBadgeProps {
  id: number;
  label: string;
  sub: string;
  icon: React.ElementType;
  className: string;
  glowColor: string;
}

const floatingBadges: FloatingBadgeProps[] = [
  {
    id: 1,
    label: "Next.js 16",
    sub: "0.2s FCP • 100 Score",
    icon: Globe,
    className: "top-[8%] left-[2%] lg:left-[5%]",
    glowColor: "rgba(56, 189, 248, 0.15)",
  },
  {
    id: 2,
    label: "AI Agents / LLM",
    sub: "RAG • 38ms Latency",
    icon: Bot,
    className: "top-[15%] right-[2%] lg:right-[6%]",
    glowColor: "rgba(168, 85, 247, 0.15)",
  },
  {
    id: 3,
    label: "React Native",
    sub: "iOS & Android 60fps",
    icon: Smartphone,
    className: "bottom-[12%] left-[3%] lg:left-[8%]",
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    id: 4,
    label: "Cloud & Kubernetes",
    sub: "99.999% Uptime",
    icon: Database,
    className: "bottom-[18%] right-[4%] lg:right-[8%]",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
  {
    id: 5,
    label: "Stripe & FinTech",
    sub: "Global Multi-Currency",
    icon: CreditCard,
    className: "top-[52%] left-[1%] lg:left-[3%]",
    glowColor: "rgba(245, 158, 11, 0.15)",
  },
];

const FloatingBadge = ({
  badge,
  mouseX,
  mouseY,
  index,
}: {
  badge: FloatingBadgeProps;
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  index: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 20 });
  const springY = useSpring(y, { stiffness: 220, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(mouseX.current - centerX, 2) +
            Math.pow(mouseY.current - centerY, 2)
        );

        if (distance < 140) {
          const angle = Math.atan2(
            mouseY.current - centerY,
            mouseX.current - centerX
          );
          const force = (1 - distance / 140) * 45;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  const Icon = badge.icon;

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
      className={cn("absolute pointer-events-auto z-20 hidden md:block", badge.className)}
    >
      <motion.div
        animate={{
          y: [0, -6, 0, 6, 0],
        }}
        transition={{
          duration: 4 + (index % 3),
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="group relative flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-surface/80 backdrop-blur-xl border border-white/10 shadow-xl hover:border-white/25 hover:bg-surface/95 transition-all duration-300 cursor-default"
        style={{
          boxShadow: `0 10px 30px -10px ${badge.glowColor}`,
        }}
      >
        <div className="h-8 w-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
          <Icon className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="text-xs font-bold text-white leading-none group-hover:text-cyan-300 transition-colors">
            {badge.label}
          </div>
          <div className="text-[10px] text-white/50 font-mono mt-0.5">
            {badge.sub}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Preset build stream data for the live terminal
type BuildType = "saas" | "mobile" | "ai";

const buildStreams: Record<
  BuildType,
  {
    title: string;
    tech: string[];
    steps: { text: string; done: boolean }[];
    metrics: { label: string; value: string; sub: string }[];
  }
> = {
  saas: {
    title: "Full-Stack SaaS MVP",
    tech: ["Next.js 16", "PostgreSQL", "Tailwind v4", "Stripe"],
    steps: [
      { text: "Auth & Multi-Tenant Organization Schema", done: true },
      { text: "Server Actions & Edge Cached Data Pipeline", done: true },
      { text: "Stripe Recurring Billing & Webhook Handlers", done: true },
      { text: "Lighthouse Performance Audit: 100/100 Core Web Vitals", done: true },
      { text: "Sprint Delivery: Day 12 • Ready to Onboard Users", done: true },
    ],
    metrics: [
      { label: "Turnaround", value: "14 Days", sub: "Idea to Live Launch" },
      { label: "Lighthouse", value: "100/100", sub: "Core Web Vitals" },
      { label: "API Speed", value: "<85ms", sub: "Edge Cached" },
      { label: "Ownership", value: "100%", sub: "Full IP Transfer" },
    ],
  },
  mobile: {
    title: "Cross-Platform iOS & Android",
    tech: ["React Native", "Expo EAS", "FastAPI", "Supabase"],
    steps: [
      { text: "Native 60 FPS Gesture & Animation Pipeline", done: true },
      { text: "Biometric Auth & Offline State Sync Engine", done: true },
      { text: "Apple App Store & Google Play EAS Automated Build", done: true },
      { text: "Push Notification Service & In-App Purchases", done: true },
      { text: "Production Release: Direct to App Stores", done: true },
    ],
    metrics: [
      { label: "Frame Rate", value: "60 FPS", sub: "Fluid UI Physics" },
      { label: "Platforms", value: "iOS + Android", sub: "Unified Codebase" },
      { label: "Deploy Time", value: "21 Days", sub: "Store Approved" },
      { label: "Code Quality", value: "Strict TS", sub: "Zero Crash Policy" },
    ],
  },
  ai: {
    title: "Bespoke AI / LLM Agent System",
    tech: ["Python", "OpenAI / Claude", "Pinecone", "Next.js"],
    steps: [
      { text: "Document Vectorization & Hybrid Semantic Search", done: true },
      { text: "Low-Latency Streaming Agent Router (<40ms)", done: true },
      { text: "Tool Calling & Automated Database Query Engine", done: true },
      { text: "Human-in-the-Loop Feedback Loop & Evaluation Guardrails", done: true },
      { text: "Deployment: Production Enterprise Gateway", done: true },
    ],
    metrics: [
      { label: "Latency", value: "38ms", sub: "Vector Search Loop" },
      { label: "Accuracy", value: "99.2%", sub: "Precision Retrieval" },
      { label: "Security", value: "SOC-2 Ready", sub: "Data Privacy First" },
      { label: "Integration", value: "Plug & Play", sub: "REST / gRPC" },
    ],
  },
};

export default function Hero({ children }: { children?: React.ReactNode }) {
  const [activeTab, setActiveTab] = React.useState<"stream" | "compare">("stream");
  const [buildType, setBuildType] = React.useState<BuildType>("saas");

  // Mouse coords for spring physics repulsion
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
  };

  const currentStream = buildStreams[buildType];

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center pt-28 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden bg-background"
    >
      {/* Optional Navbar / Top Slot */}
      {children}

      {/* Floating Interactive Physics Badges */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingBadges.map((badge, index) => (
          <FloatingBadge
            key={badge.id}
            badge={badge}
            mouseX={mouseX}
            mouseY={mouseY}
            index={index}
          />
        ))}
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[450px] sm:w-[550px] h-[450px] sm:h-[550px] bg-cyan-500/10 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-blue-600/10 rounded-full blur-[130px] -z-10 pointer-events-none" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Freelancing Outcome & Speed Headline (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-7 relative z-10"
          >
            {/* Availability / Urgency Pill */}
            <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full glass border border-emerald-500/30 bg-emerald-500/5 shadow-lg shadow-emerald-500/10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-emerald-300 uppercase">
                ⚡ Now Booking Client Sprints • 2 Slots Available
              </span>
            </div>

            {/* Main Headline & Subheadline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                High-Velocity Web, Mobile & AI Engineering{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                  For Ambitious Brands.
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl leading-relaxed font-normal">
                From concept to production-ready MVP in weeks, not quarters. Fixed pricing, weekly sprint demos, full IP ownership, and zero agency bloat.
              </p>
            </div>

            {/* Dual Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <a
                href="#estimator"
                className="px-7 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm sm:text-base rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <Zap className="w-5 h-5 fill-current text-white" />
                <span>Start a Project / Scope Estimate</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href={siteConfig.contact.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 glass text-white font-medium text-sm sm:text-base rounded-2xl flex items-center justify-center space-x-2 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Book 15-Min Discovery Call</span>
              </a>
            </div>

            {/* Trust Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-medium text-white/80">14-Day MVP Launch</span>
              </div>
              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-white/80">100% IP Transfer</span>
              </div>
              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs font-medium text-white/80">5.0 Client Rating</span>
              </div>
              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <Activity className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-xs font-medium text-white/80">&lt;24h Response</span>
              </div>
            </div>

            {/* Direct Social & WhatsApp Connect */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10">
              <span className="text-xs text-white/40 font-semibold uppercase tracking-wider">
                Direct Channels
              </span>
              <div className="flex items-center space-x-4">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappPhone}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/20 transition-colors"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={siteConfig.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-cyan-400 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-cyan-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-cyan-400 transition-colors"
                  aria-label="Twitter"
                >
                  <FaXTwitter className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-white/50 hover:text-cyan-400 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Multi-Tab Studio Showcase (Build Stream + Agency Comparison) (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative z-10 w-full"
          >
            <div className="rounded-3xl border border-white/10 bg-surface/70 backdrop-blur-2xl p-5 sm:p-6 shadow-2xl space-y-5 relative overflow-hidden">
              
              {/* Header Tab Switcher: Build Stream vs Comparison */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center space-x-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/5">
                  <button
                    onClick={() => setActiveTab("stream")}
                    className={cn(
                      "flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
                      activeTab === "stream"
                        ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/25"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Live Build Stream</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("compare")}
                    className={cn(
                      "flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
                      activeTab === "compare"
                        ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/25"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>Agency vs ASSolutions</span>
                  </button>
                </div>

                <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live Production</span>
                </div>
              </div>

              {/* TAB 1: Live Studio Build Stream */}
              {activeTab === "stream" && (
                <div className="space-y-4">
                  {/* Build Type Pills */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setBuildType("saas")}
                      className={cn(
                        "flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-all text-center",
                        buildType === "saas"
                          ? "bg-white/15 border-cyan-400/50 text-cyan-300"
                          : "bg-white/[0.02] border-white/5 text-white/50 hover:text-white/80"
                      )}
                    >
                      Web / SaaS
                    </button>
                    <button
                      onClick={() => setBuildType("mobile")}
                      className={cn(
                        "flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-all text-center",
                        buildType === "mobile"
                          ? "bg-white/15 border-cyan-400/50 text-cyan-300"
                          : "bg-white/[0.02] border-white/5 text-white/50 hover:text-white/80"
                      )}
                    >
                      Mobile App
                    </button>
                    <button
                      onClick={() => setBuildType("ai")}
                      className={cn(
                        "flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-all text-center",
                        buildType === "ai"
                          ? "bg-white/15 border-cyan-400/50 text-cyan-300"
                          : "bg-white/[0.02] border-white/5 text-white/50 hover:text-white/80"
                      )}
                    >
                      AI Integration
                    </button>
                  </div>

                  {/* Terminal Window Box */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs space-y-2.5">
                    <div className="flex items-center justify-between text-white/40 pb-2 border-b border-white/5 text-[10px]">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        <span className="ml-2 text-white/60">sprint-engine :: {buildType}</span>
                      </div>
                      <span className="text-cyan-400/80">READY TO SHIP</span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {currentStream.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-[11px] text-white/80">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{step.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4 Metric Chips */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {currentStream.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl border border-white/5 bg-white/[0.02] space-y-0.5"
                      >
                        <div className="text-[10px] text-white/40 uppercase font-semibold">
                          {m.label}
                        </div>
                        <div className="text-xl font-bold text-white tracking-tight">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-cyan-400/90 font-mono">
                          {m.sub}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: Agency vs ASSolutions Comparison */}
              {activeTab === "compare" && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Old Agency */}
                    <div className="p-3.5 rounded-2xl bg-red-950/10 border border-red-500/20 space-y-3">
                      <div className="flex items-center space-x-2 pb-2 border-b border-red-500/20">
                        <X className="w-4 h-4 text-red-400 shrink-0" />
                        <span className="text-xs font-bold text-red-300">Old Agencies</span>
                      </div>
                      <div className="space-y-2 text-[11px] text-white/70">
                        <div className="flex items-start space-x-1.5">
                          <span className="text-red-400">✕</span>
                          <span>3–6 months delivery drag</span>
                        </div>
                        <div className="flex items-start space-x-1.5">
                          <span className="text-red-400">✕</span>
                          <span>$40k+ bloated billings</span>
                        </div>
                        <div className="flex items-start space-x-1.5">
                          <span className="text-red-400">✕</span>
                          <span>Account manager middleman</span>
                        </div>
                        <div className="flex items-start space-x-1.5">
                          <span className="text-red-400">✕</span>
                          <span>Messy vendor lock-in</span>
                        </div>
                      </div>
                    </div>

                    {/* ASSolutions */}
                    <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3 shadow-lg shadow-emerald-500/10">
                      <div className="flex items-center space-x-2 pb-2 border-b border-emerald-500/30">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs font-bold text-emerald-300">ASSolutions</span>
                      </div>
                      <div className="space-y-2 text-[11px] text-white/90">
                        <div className="flex items-start space-x-1.5">
                          <span className="text-emerald-400">✔</span>
                          <span>14–21 day MVP launch</span>
                        </div>
                        <div className="flex items-start space-x-1.5">
                          <span className="text-emerald-400">✔</span>
                          <span>Fixed, transparent pricing</span>
                        </div>
                        <div className="flex items-start space-x-1.5">
                          <span className="text-emerald-400">✔</span>
                          <span>Direct senior engineer access</span>
                        </div>
                        <div className="flex items-start space-x-1.5">
                          <span className="text-emerald-400">✔</span>
                          <span>100% Code & IP ownership</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs text-white/70">
                    <span>Average Client Savings:</span>
                    <span className="font-bold text-cyan-300">~60% Cost & 4x Speed</span>
                  </div>
                </div>
              )}

              {/* Direct Estimator Anchor Link */}
              <div className="pt-1">
                <a
                  href="#estimator"
                  className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-semibold text-xs sm:text-sm transition-all group"
                >
                  <Layers className="w-4 h-4 text-cyan-400 group-hover:rotate-6 transition-transform" />
                  <span>Configure Your Custom Sprint & Budget</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
