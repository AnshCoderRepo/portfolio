"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  User,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  MessageSquare,
  Layers,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/config/site";

// Meeting platform options
const PLATFORMS = [
  { id: "google_meet", label: "Google Meet", note: "Direct link via email" },
  { id: "zoom", label: "Zoom", note: "Meeting ID & Passcode" },
  { id: "whatsapp", label: "WhatsApp Audio/Video", note: "Direct to your mobile" },
  { id: "phone", label: "Standard Phone Call", note: "Direct voice line" },
];

// Project scopes
const SCOPES = [
  "Full-Cycle Web Platform / MVP",
  "Mobile App (iOS & Android)",
  "AI Agents & Intelligent Pipelines",
  "High-Throughput Cloud & Backend",
  "UI/UX Systems & Motion Experience",
  "Other / Custom Architecture",
];

// Time slots
const TIME_SLOTS = [
  { id: "morning", label: "Morning", time: "09:00 AM – 12:00 PM" },
  { id: "afternoon", label: "Afternoon", time: "12:00 PM – 04:00 PM" },
  { id: "evening", label: "Evening", time: "04:00 PM – 08:00 PM" },
];

// Timelines
const TIMELINES = [
  "Immediate (< 1 Month)",
  "1 – 3 Months",
  "3 – 6 Months",
  "Flexible / Advisory",
];

export default function BookACallPage() {
  // Today's date string in YYYY-MM-DD for min date
  const todayStr = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    platform: "google_meet",
    preferredDate: todayStr,
    timeSlot: "afternoon",
    projectScope: "Full-Cycle Web Platform / MVP",
    timeline: "1 – 3 Months",
    brief: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const platformLabel =
      PLATFORMS.find((p) => p.id === formData.platform)?.label || formData.platform;
    const timeSlotLabel =
      TIME_SLOTS.find((t) => t.id === formData.timeSlot)?.label || formData.timeSlot;
    const timeSlotHours =
      TIME_SLOTS.find((t) => t.id === formData.timeSlot)?.time || "";

    const messagePayload = `
--- Discovery Call Request Details ---
Client Name: ${formData.name}
Email: ${formData.email}
Phone / WhatsApp: ${formData.phone || "Not provided"}
Company: ${formData.company || "Independent / Startup"}

Meeting Logistics:
- Preferred Platform: ${platformLabel}
- Preferred Date: ${formData.preferredDate}
- Preferred Time Window: ${timeSlotLabel} (${timeSlotHours})

Project Specifications:
- Focus Area: ${formData.projectScope}
- Estimated Timeline: ${formData.timeline}

Project Overview / Discussion Topics:
${formData.brief}
    `.trim();

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Discovery Call: ${formData.projectScope} (${formData.preferredDate})`,
          message: messagePayload,
          source: "book_a_call",
          timeline: formData.timeline,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to schedule discovery call");
      }

      setSubmittedData({ ...formData });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      platform: "google_meet",
      preferredDate: todayStr,
      timeSlot: "afternoon",
      projectScope: "Full-Cycle Web Platform / MVP",
      timeline: "1 – 3 Months",
      brief: "",
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground pt-24 sm:pt-28 pb-20 overflow-hidden">
      {/* Background ambient decorative blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute -top-32 left-1/4 w-[520px] h-[520px] bg-cyan-500/20 blur-[130px] rounded-full" />
        <div className="absolute -top-20 right-1/4 w-[480px] h-[480px] bg-purple-500/20 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-accent-color transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-5 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Direct Technical Consultation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-5 leading-tight">
            Book a 30-Minute <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
              Project Discovery Call
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Schedule a focused technical session directly with our senior software architects. Provide your details below, and we will send a calendar invite and video link tailored to your project roadmap.
          </p>
        </div>

        {/* Content Section: Either Confirmation or Form */}
        <AnimatePresence mode="wait">
          {submittedData ? (
            /* Confirmation State */
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto rounded-3xl border border-emerald-500/30 bg-surface/90 backdrop-blur-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-6 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="text-center mb-8">
                <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider font-semibold">
                  Booking Request Confirmed
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Thank You, {submittedData.name.split(" ")[0]}!
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
                  We have received your discovery consultation details. Our engineering lead will review your requirements and send a calendar invitation to{" "}
                  <strong className="text-white">{submittedData.email}</strong> within 4–6 business hours.
                </p>
              </div>

              {/* Consultation Summary Card */}
              <div className="rounded-2xl border border-card-border bg-card/60 p-5 sm:p-6 mb-8 space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-1.5 border-b border-card-border">
                  <span className="text-muted-foreground">Preferred Date:</span>
                  <span className="font-semibold text-white">{submittedData.preferredDate}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-card-border">
                  <span className="text-muted-foreground">Time Window:</span>
                  <span className="font-semibold text-white">
                    {TIME_SLOTS.find((t) => t.id === submittedData.timeSlot)?.label} (
                    {TIME_SLOTS.find((t) => t.id === submittedData.timeSlot)?.time})
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-card-border">
                  <span className="text-muted-foreground">Meeting Platform:</span>
                  <span className="font-semibold text-cyan-400">
                    {PLATFORMS.find((p) => p.id === submittedData.platform)?.label}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-card-border">
                  <span className="text-muted-foreground">Project Scope:</span>
                  <span className="font-semibold text-white">{submittedData.projectScope}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-muted-foreground">Timeline:</span>
                  <span className="font-semibold text-white">{submittedData.timeline}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent-color text-background font-semibold text-xs sm:text-sm text-center transition-all hover:shadow-lg hover:shadow-accent-color/20"
                >
                  Return to Homepage
                </Link>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-card-border bg-surface text-muted-foreground hover:text-white hover:bg-card text-xs sm:text-sm font-medium transition-colors"
                >
                  Book Another Call
                </button>
              </div>

              {/* Calendly Fallback notice */}
              <div className="mt-8 pt-6 border-t border-card-border text-center">
                <p className="text-[11px] text-muted-foreground">
                  Need an instant calendar slot sync right now?{" "}
                  <a
                    href={siteConfig.contact.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 underline hover:text-cyan-300 font-medium inline-flex items-center gap-1"
                  >
                    <span>View our live Calendly calendar</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>
            </motion.div>
          ) : (
            /* Booking Form + Consultation Guide */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
            >
              {/* Left Column: What to Expect & Value Perks */}
              <div className="lg:col-span-5 space-y-6">
                {/* Consultation Card */}
                <div className="rounded-3xl border border-card-border bg-surface/70 backdrop-blur-xl p-6 sm:p-7 shadow-xl space-y-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                      What To Expect
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      Our 30-Minute Architecture Session
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      Every session is led directly by experienced engineers who have built, scaled, and delivered dozens of production systems.
                    </p>
                  </div>

                  <div className="space-y-4 pt-1">
                    {[
                      {
                        icon: Layers,
                        title: "Architecture & Stack Feasibility",
                        desc: "Analyze trade-offs between Next.js, Go, Python, React Native, and distributed microservices for your use case.",
                        color: "text-cyan-400 bg-cyan-950/60 border-cyan-500/30",
                      },
                      {
                        icon: Sparkles,
                        title: "Milestones & Delivery Roadmap",
                        desc: "Break down your scope into tangible 2-week sprints, MVP launch timelines, and risk mitigation strategies.",
                        color: "text-purple-400 bg-purple-950/60 border-purple-500/30",
                      },
                      {
                        icon: Video,
                        title: "Direct Access to Tech Leads",
                        desc: "No non-technical intermediaries or sales pitches. High-signal engineering discussion from minute one.",
                        color: "text-emerald-400 bg-emerald-950/60 border-emerald-500/30",
                      },
                      {
                        icon: ShieldCheck,
                        title: "Strict NDA & IP Confidentiality",
                        desc: "Your ideas and intellectual property remain 100% confidential. Mutual NDAs executed on request.",
                        color: "text-amber-400 bg-amber-950/60 border-amber-500/30",
                      },
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div key={idx} className="flex items-start gap-3.5">
                          <div
                            className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${item.color}`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-white">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Immediate Alternatives Box */}
                  <div className="pt-4 border-t border-card-border space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Prefer instant messaging?</span>
                      <a
                        href={`https://wa.me/${siteConfig.contact.whatsappPhone}?text=${encodeURIComponent(
                          siteConfig.contact.whatsappMessage
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Prefer direct email?</span>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{siteConfig.contact.email}</span>
                      </a>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Prefer direct phone call?</span>
                      <a
                        href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                        className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{siteConfig.contact.phone}</span>
                      </a>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Prefer direct Calendly slot?</span>
                      <a
                        href={siteConfig.contact.calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Open Calendly</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Booking Form */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-3xl border border-card-border bg-surface/70 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6"
                >
                  {error && (
                    <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs">
                      {error}
                    </div>
                  )}

                  {/* Section 1: Contact Information */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-accent-color font-mono mb-4 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>1. Your Information</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                          Full Name <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, name: e.target.value }))
                          }
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-background/80 border border-card-border text-foreground text-xs focus:outline-none focus:border-accent-color focus:ring-1 focus:ring-accent-color transition"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                          Email Address <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, email: e.target.value }))
                          }
                          placeholder="alex@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-background/80 border border-card-border text-foreground text-xs focus:outline-none focus:border-accent-color focus:ring-1 focus:ring-accent-color transition"
                        />
                      </div>

                      {/* Phone / WhatsApp */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-background/80 border border-card-border text-foreground text-xs focus:outline-none focus:border-accent-color focus:ring-1 focus:ring-accent-color transition"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, company: e.target.value }))
                          }
                          placeholder="Acme Corp or Startup"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-background/80 border border-card-border text-foreground text-xs focus:outline-none focus:border-accent-color focus:ring-1 focus:ring-accent-color transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Meeting Logistics */}
                  <div className="pt-4 border-t border-card-border">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-accent-color font-mono mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>2. Preferred Schedule & Platform</span>
                    </h3>

                    {/* Platform Selector */}
                    <div className="mb-4">
                      <label className="block text-xs font-medium text-muted-foreground mb-2">
                        Preferred Meeting Platform
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {PLATFORMS.map((p) => {
                          const isSelected = formData.platform === p.id;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({ ...prev, platform: p.id }))
                              }
                              className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                                isSelected
                                  ? "border-accent-color bg-accent-color/10 text-accent-color shadow-[0_0_15px_rgba(6,182,212,0.15)] font-semibold"
                                  : "border-card-border bg-background/40 text-muted-foreground hover:border-card-border hover:text-foreground"
                              }`}
                            >
                              <span className="text-xs font-medium">{p.label}</span>
                              <span className="text-[10px] text-muted-foreground mt-1 opacity-80">
                                {p.note}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Date and Time Slot */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Preferred Date */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                          Preferred Date <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          min={todayStr}
                          value={formData.preferredDate}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, preferredDate: e.target.value }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-background/80 border border-card-border text-foreground text-xs focus:outline-none focus:border-accent-color focus:ring-1 focus:ring-accent-color transition"
                        />
                      </div>

                      {/* Time Slot Window */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                          Preferred Time Window
                        </label>
                        <select
                          value={formData.timeSlot}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, timeSlot: e.target.value }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-background/80 border border-card-border text-foreground text-xs focus:outline-none focus:border-accent-color focus:ring-1 focus:ring-accent-color transition"
                        >
                          {TIME_SLOTS.map((t) => (
                            <option key={t.id} value={t.id} className="bg-neutral-900 text-white">
                              {t.label} ({t.time})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Project Scope & Brief */}
                  <div className="pt-4 border-t border-card-border">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-accent-color font-mono mb-4 flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      <span>3. Project Details & Agenda</span>
                    </h3>

                    {/* Project Scope Badges */}
                    <div className="mb-4">
                      <label className="block text-xs font-medium text-muted-foreground mb-2">
                        Project Focus Area
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SCOPES.map((scope) => {
                          const isSelected = formData.projectScope === scope;
                          return (
                            <button
                              key={scope}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({ ...prev, projectScope: scope }))
                              }
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                                isSelected
                                  ? "bg-accent-color text-background border-accent-color font-semibold shadow-sm"
                                  : "bg-background/40 border-card-border text-muted-foreground hover:text-white"
                              }`}
                            >
                              {scope}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="mb-4">
                      <label className="block text-xs font-medium text-muted-foreground mb-2">
                        Desired Delivery Timeline
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {TIMELINES.map((t) => {
                          const isSelected = formData.timeline === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({ ...prev, timeline: t }))
                              }
                              className={`py-2 px-2.5 rounded-xl text-center text-xs border transition ${
                                isSelected
                                  ? "bg-accent-color/15 border-accent-color text-accent-color font-semibold"
                                  : "bg-background/40 border-card-border text-muted-foreground hover:text-white"
                              }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Brief / Discussion Topics */}
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Project Brief & Discussion Topics <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.brief}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, brief: e.target.value }))
                        }
                        placeholder="Tell us about the product you want to build, existing systems/codebase, key objectives, or questions you would like addressed during the call..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-background/80 border border-card-border text-foreground text-xs focus:outline-none focus:border-accent-color focus:ring-1 focus:ring-accent-color transition resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Submission CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-accent-color text-background font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:opacity-95 hover:shadow-[0_0_25px_rgba(225,224,204,0.35)] disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          <span>Scheduling Consultation Request...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>Confirm Discovery Call Booking</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-muted-foreground mt-3">
                      🔒 100% Confidential. We review details and dispatch your meeting invite within 4–6 business hours.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
