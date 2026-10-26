"use client";

import React from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Calendar, Sparkles, ArrowRight } from "lucide-react";
import { RippleButton } from "@/components/ui/multi-type-ripple-buttons";
import { siteConfig } from "@/config/site";

export default function ContactUsPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "contact_page",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to deliver inquiry");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full relative min-h-screen bg-background text-foreground pt-28 pb-20 sm:pb-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 blur-[130px] rounded-full" />
        <div className="absolute -top-20 right-1/4 w-[450px] h-[450px] bg-purple-500/20 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span>Direct Engineering Consultation</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-accent-color leading-tight mb-5">
            Let&apos;s Build Something <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Exceptional.</span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Reach out directly to discuss your system architecture, custom development, or AI integrations. Our engineering team is ready to scope and deliver.
          </p>
        </div>

      {/* 2. Seamless Interactive Contact Form overlay/section below pricing */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-24 -mt-10">
        <div className="backdrop-blur-[14px] bg-gradient-to-br from-surface/80 to-surface/60 border border-surface-border rounded-3xl p-8 md:p-12 shadow-2xl grid md:grid-cols-12 gap-10">
          
          {/* Info Card column */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-accent-color">Let&apos;s build together</h2>
              <p className="text-sm text-text-secondary mt-2">
                Have a custom request or need enterprise consultancy? Drop us a line. Our team of premium freelancers is ready.
              </p>
            </div>

            <div className="space-y-4 font-sans text-sm">
              <div className="flex items-center gap-3 text-accent-color/80">
                <div className="p-2.5 rounded-lg bg-surface-alt border border-surface-border">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-accent-color/80">
                <div className="p-2.5 rounded-lg bg-surface-alt border border-surface-border">
                  <Phone className="w-4 h-4 text-cyan-400" />
                </div>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-accent-color/80">
                <div className="p-2.5 rounded-lg bg-surface-alt border border-surface-border">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <span>{siteConfig.contact.location}</span>
              </div>
            </div>
          </div>

          {/* Form column */}
          <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4 font-sans text-sm">
            {submitted && (
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs">
                ✨ Thank you! Your inquiry has been sent to NSSolutions. Our team will review your project details and follow up promptly.
              </div>
            )}

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs">
                ⚠️ {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-text-secondary">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border bg-surface-alt text-accent-color focus:outline-none focus:border-cyan-400 transition"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-text-secondary">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border bg-surface-alt text-accent-color focus:outline-none focus:border-cyan-400 transition"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-text-secondary">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-border bg-surface-alt text-accent-color focus:outline-none focus:border-cyan-400 transition"
                placeholder="Custom Project Details"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-text-secondary">Message</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-border bg-surface-alt text-accent-color focus:outline-none focus:border-cyan-400 transition resize-none"
                placeholder="Tell us about your requirements, project timelines, and goals..."
              />
            </div>

            <RippleButton
              type="submit"
              variant="default"
              disabled={submitting}
              className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-xl flex items-center justify-center gap-2 mt-2 transition disabled:opacity-60 cursor-pointer"
            >
              {submitting ? (
                <span>Delivering inquiry...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </RippleButton>
          </form>

        </div>
      </section>
      </div>
    </div>
  );
}
