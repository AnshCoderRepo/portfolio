"use client";

import { useState } from "react";
import {
  Sparkles,
  Rocket,
  Bot,
  Layers,
  Server,
  Zap,
  Check,
  Calendar,
  MessageCircle,
  Copy,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

interface ProjectTypeOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  baseDays: number;
  icon: typeof Rocket;
  badge?: string;
}

interface FeatureOption {
  id: string;
  name: string;
  category: string;
  price: number;
  days: number;
  description: string;
}

interface SpeedOption {
  id: string;
  name: string;
  multiplier: number;
  dayModifier: number;
  badge: string;
  desc: string;
}

const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: "saas",
    name: "Full-Stack SaaS / Web App",
    description: "Production-ready Next.js 15 app with Auth, Database, API routes & modern UI.",
    basePrice: 2400,
    baseDays: 18,
    icon: Layers,
    badge: "Most Popular",
  },
  {
    id: "mvp",
    name: "Rapid MVP Launch (0 to 1)",
    description: "Turn your startup idea into a launched, testable product in under 14 days.",
    basePrice: 1800,
    baseDays: 12,
    icon: Rocket,
    badge: "Fastest ROI",
  },
  {
    id: "ai",
    name: "AI Agent & LLM Workflow",
    description: "Custom AI agents, RAG knowledge pipelines, OpenAI/Claude API integration.",
    basePrice: 2200,
    baseDays: 14,
    icon: Bot,
    badge: "High Growth",
  },
  {
    id: "performance",
    name: "Performance & Architecture Overhaul",
    description: "Refactor legacy codebase, 100/100 Lighthouse score, sub-second latency & cloud setup.",
    basePrice: 1500,
    baseDays: 8,
    icon: Zap,
  },
  {
    id: "landing",
    name: "High-Converting Digital Experience",
    description: "Award-winning design, 3D/micro-animations, storytelling scroll & lead funnels.",
    basePrice: 1200,
    baseDays: 7,
    icon: Server,
  },
];

const FEATURE_OPTIONS: FeatureOption[] = [
  {
    id: "auth",
    name: "User Authentication & Roles",
    category: "Security",
    price: 350,
    days: 2,
    description: "OAuth (Google/GitHub/Email), magic links & role-based permissions.",
  },
  {
    id: "payments",
    name: "Stripe / Subscriptions & Invoicing",
    category: "Monetization",
    price: 450,
    days: 3,
    description: "One-time checkouts, recurring billing, customer portal & webhooks.",
  },
  {
    id: "ai_chat",
    name: "AI Copilot / Semantic Search",
    category: "AI",
    price: 650,
    days: 4,
    description: "Vector embeddings, streaming chat UI & contextual knowledge base.",
  },
  {
    id: "dashboard",
    name: "Interactive Admin Dashboard",
    category: "Analytics",
    price: 500,
    days: 3,
    description: "Dynamic data charts, user metrics, real-time KPI visualization.",
  },
  {
    id: "realtime",
    name: "Real-Time Sync / WebSockets",
    category: "Backend",
    price: 400,
    days: 3,
    description: "Live notifications, collaborative editing or chat messaging.",
  },
  {
    id: "cms",
    name: "Headless CMS & Blog Engine",
    category: "Content",
    price: 350,
    days: 2,
    description: "Sanity/Notion/Markdown CMS with automated SEO indexing & RSS.",
  },
  {
    id: "design",
    name: "Bespoke Figma UI/UX Design System",
    category: "Design",
    price: 550,
    days: 4,
    description: "Complete custom wireframes, interactive prototype & design tokens.",
  },
  {
    id: "mobile_pwa",
    name: "Mobile PWA & App Store Readiness",
    category: "Mobile",
    price: 300,
    days: 2,
    description: "Offline support, installable mobile app experience & push alerts.",
  },
];

const SPEED_OPTIONS: SpeedOption[] = [
  {
    id: "standard",
    name: "Standard Sprint",
    multiplier: 1.0,
    dayModifier: 0,
    badge: "Recommended",
    desc: "Careful pacing with structured weekly milestone demos.",
  },
  {
    id: "fast",
    name: "Fast-Track",
    multiplier: 1.15,
    dayModifier: -4,
    badge: "15% Speed Rush",
    desc: "Priority engineering bandwidth for urgent go-to-market launches.",
  },
  {
    id: "hyper",
    name: "Hyper-Rush Sprint",
    multiplier: 1.3,
    dayModifier: -7,
    badge: "Max Velocity",
    desc: "Dedicated daily sprints to beat an immediate client or investor deadline.",
  },
];

export default function ProjectCostEstimator() {
  const [selectedType, setSelectedType] = useState<string>("saas");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["auth", "payments", "dashboard"]);
  const [selectedSpeed, setSelectedSpeed] = useState<string>("standard");
  const [copied, setCopied] = useState(false);

  // Derive active selections
  const currentType = PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0];
  const currentSpeed = SPEED_OPTIONS.find((s) => s.id === selectedSpeed) || SPEED_OPTIONS[0];

  const featuresPriceSum = selectedFeatures.reduce((acc, featId) => {
    const feat = FEATURE_OPTIONS.find((f) => f.id === featId);
    return acc + (feat?.price || 0);
  }, 0);

  const featuresDaysSum = selectedFeatures.reduce((acc, featId) => {
    const feat = FEATURE_OPTIONS.find((f) => f.id === featId);
    return acc + (feat?.days || 0);
  }, 0);

  // Total calculation
  const rawPrice = (currentType.basePrice + featuresPriceSum) * currentSpeed.multiplier;
  const minPrice = Math.round((rawPrice * 0.95) / 50) * 50;
  const maxPrice = Math.round((rawPrice * 1.1) / 50) * 50;

  const rawDays = Math.max(7, Math.round(currentType.baseDays + featuresDaysSum + currentSpeed.dayModifier));
  const minDays = Math.max(5, rawDays - 2);
  const maxDays = rawDays + 3;

  const minWeeks = (minDays / 7).toFixed(1).replace(".0", "");
  const maxWeeks = (maxDays / 7).toFixed(1).replace(".0", "");

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getScopeSummaryText = () => {
    const featNames = selectedFeatures
      .map((fId) => FEATURE_OPTIONS.find((f) => f.id === fId)?.name)
      .filter(Boolean)
      .join(", ");

    return `Hi Ansh! I used your Project Scope Estimator:\n\n` +
      `• Project Type: ${currentType.name}\n` +
      `• Key Features: ${featNames || "Core Prototype"}\n` +
      `• Pace: ${currentSpeed.name}\n` +
      `• Estimated Budget: $${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}\n` +
      `• Estimated Timeline: ${minWeeks} - ${maxWeeks} Weeks\n\n` +
      `I would love to book a quick discovery call to discuss my project!`;
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(getScopeSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappHref = `https://wa.me/919999999999?text=${encodeURIComponent(getScopeSummaryText())}`;
  const calendlyHref = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/assolutions";

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" id="estimator">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-accent-color/5 blur-[120px]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-color/20 bg-accent-color/5 text-accent-color text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent-color" />
            <span>Interactive Project Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Calculate Your Project Scope & Timeline
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary">
            Select your requirements below to get an instant scope estimate, realistic timeline, and locked-in sprint budget with zero surprises.
          </p>
        </div>

        {/* 2-Column Layout: Controls on left, Live Sticky Quote Card on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Steps (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Step 1: Project Type */}
            <div className="rounded-3xl border border-surface-border bg-surface/40 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-color/10 text-accent-color font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">What are we building?</h3>
                  <p className="text-xs sm:text-sm text-text-secondary">Choose the baseline core architecture of your project</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((type) => {
                  const isSelected = selectedType === type.id;
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`relative flex flex-col justify-between text-left p-4 rounded-2xl border transition-all ${
                        isSelected
                          ? "border-accent-color bg-accent-color/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] ring-1 ring-accent-color"
                          : "border-surface-border bg-surface/60 hover:border-accent-color/30 hover:bg-surface"
                      }`}
                    >
                      {type.badge && (
                        <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent-color/20 text-accent-color border border-accent-color/30">
                          {type.badge}
                        </span>
                      )}
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-xl ${isSelected ? "bg-accent-color text-background" : "bg-surface-alt text-accent-color"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-sm text-foreground pr-12">{type.name}</span>
                      </div>
                      <p className="text-xs text-text-secondary line-clamp-2 mt-1">{type.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Key Features & Add-ons */}
            <div className="rounded-3xl border border-surface-border bg-surface/40 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-color/10 text-accent-color font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">Core Modules & Features</h3>
                    <p className="text-xs sm:text-sm text-text-secondary">Select all specific functionality your product needs</p>
                  </div>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-surface-alt text-text-secondary">
                  {selectedFeatures.length} selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURE_OPTIONS.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                        isChecked
                          ? "border-accent-color/80 bg-accent-color/10 ring-1 ring-accent-color/50"
                          : "border-surface-border bg-surface/60 hover:border-accent-color/20 hover:bg-surface"
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                          isChecked
                            ? "border-accent-color bg-accent-color text-background"
                            : "border-surface-border bg-surface"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-semibold text-foreground">{feat.name}</span>
                          <span className="text-[10px] font-mono text-accent-color/70">+${feat.price}</span>
                        </div>
                        <p className="text-[11px] text-text-secondary mt-0.5 line-clamp-2">{feat.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Delivery Speed */}
            <div className="rounded-3xl border border-surface-border bg-surface/40 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-color/10 text-accent-color font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">Delivery Speed & Timeline</h3>
                  <p className="text-xs sm:text-sm text-text-secondary">How quickly do you need this in production?</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SPEED_OPTIONS.map((speed) => {
                  const isSelected = selectedSpeed === speed.id;
                  return (
                    <button
                      key={speed.id}
                      onClick={() => setSelectedSpeed(speed.id)}
                      className={`flex flex-col justify-between p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "border-accent-color bg-accent-color/10 ring-1 ring-accent-color shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                          : "border-surface-border bg-surface/60 hover:border-accent-color/20 hover:bg-surface"
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-surface-alt text-accent-color border border-surface-border inline-block mb-2">
                          {speed.badge}
                        </span>
                        <div className="font-semibold text-sm text-foreground">{speed.name}</div>
                      </div>
                      <p className="text-[11px] text-text-secondary mt-2">{speed.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Live Estimation & Booking Card (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-accent-color/20 bg-surface/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-surface-border">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-text-secondary uppercase">
                    Estimated Investment
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1 tracking-tight">
                    ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}
                    <span className="text-xs text-text-secondary font-normal ml-2">USD</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold tracking-wider text-text-secondary uppercase">
                    Timeline
                  </span>
                  <div className="text-lg sm:text-xl font-bold text-accent-color mt-1">
                    ~{minWeeks} to {maxWeeks} Weeks
                  </div>
                </div>
              </div>

              {/* Selected Scope Breakdown List */}
              <div className="py-6 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                  Included in this sprint:
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-foreground font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Architecture: <strong className="text-accent-color">{currentType.name}</strong></span>
                  </div>

                  {selectedFeatures.map((featId) => {
                    const feat = FEATURE_OPTIONS.find((f) => f.id === featId);
                    if (!feat) return null;
                    return (
                      <div key={featId} className="flex items-center gap-2.5 text-xs text-text-secondary">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat.name}</span>
                      </div>
                    );
                  })}

                  <div className="flex items-center gap-2.5 text-xs text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Speed: <strong>{currentSpeed.name}</strong></span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>100% Code Ownership & Production GitHub Repo</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>30 Days Post-Launch Bug Warranty & Support</span>
                  </div>
                </div>
              </div>

              {/* High-Converting Action CTAs */}
              <div className="space-y-3 pt-2">
                <a
                  href={calendlyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl bg-accent-color text-background font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Lock in Estimate & Book Call</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl border border-surface-border bg-surface-alt/60 hover:bg-surface-alt text-xs font-semibold text-foreground transition-all hover:border-emerald-500/40"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Scope</span>
                  </a>

                  <button
                    onClick={handleCopySummary}
                    className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl border border-surface-border bg-surface-alt/60 hover:bg-surface-alt text-xs font-semibold text-foreground transition-all"
                  >
                    <Copy className="w-3.5 h-3.5 text-accent-color" />
                    <span>{copied ? "Copied!" : "Copy Summary"}</span>
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-surface-border flex items-center justify-between text-[11px] text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-accent-color" />
                  <span>NDA Protected</span>
                </div>
                <div>•</div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Sub-200ms Latency</span>
                </div>
                <div>•</div>
                <div>Milestone Invoicing</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
