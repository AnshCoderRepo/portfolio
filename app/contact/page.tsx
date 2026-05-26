"use client";

import React from "react";
import { ModernPricingPage } from "@/components/ui/animated-glassy-pricing";
import type { PricingCardProps } from "@/components/ui/animated-glassy-pricing";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { RippleButton } from "@/components/ui/multi-type-ripple-buttons";

const myPricingPlans: PricingCardProps[] = [
  { 
    planName: 'Basic', 
    description: 'Perfect for personal projects and hobbyists.', 
    price: '0', 
    features: ['1 User', '1GB Storage', 'Community Forum'], 
    buttonText: 'Get Started', 
    buttonVariant: 'secondary'
  },
  { 
    planName: 'Team', 
    description: 'Collaborate with your team on multiple projects.', 
    price: '49', 
    features: ['10 Users', '100GB Storage', 'Email Support', 'Shared Workspaces'], 
    buttonText: 'Choose Team Plan', 
    isPopular: true, 
    buttonVariant: 'primary' 
  },
  { 
    planName: 'Agency', 
    description: 'Manage all your clients under one roof.', 
    price: '149', 
    features: ['Unlimited Users', '1TB Storage', 'Dedicated Support', 'Client Invoicing'], 
    buttonText: 'Contact Us', 
    buttonVariant: 'primary' 
  },
];

export default function ContactUsPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <div className="w-full relative min-h-screen">
      {/* 1. Main Premium Pricing Page with WebGL Canvas Background */}
      <ModernPricingPage
        title={
          <>
            Choose Your Plan & <span className="text-cyan-400 font-normal">Contact Us</span>
          </>
        }
        subtitle="Start for free, then grow with us. Reach out directly to initiate custom projects."
        plans={myPricingPlans}
        showAnimatedBackground={true}
      />

      {/* 2. Seamless Interactive Contact Form overlay/section below pricing */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-24 -mt-10">
        <div className="backdrop-blur-[14px] bg-gradient-to-br from-black/20 to-black/10 dark:from-white/5 dark:to-white/0 border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl grid md:grid-cols-12 gap-10">
          
          {/* Info Card column */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">Let's build together</h2>
              <p className="text-sm text-neutral-400 mt-2">
                Have a custom request or need enterprise consultancy? Drop us a line. Our team of premium freelancers is ready.
              </p>
            </div>

            <div className="space-y-4 font-sans text-sm">
              <div className="flex items-center gap-3 text-neutral-300">
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/10">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <span>hello@assolutions.com</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/10">
                  <Phone className="w-4 h-4 text-cyan-400" />
                </div>
                <span>+1 (555) 019-2834</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/10">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Form column */}
          <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4 font-sans text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Your Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-cyan-400 transition"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-cyan-400 transition"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Subject</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-cyan-400 transition"
                placeholder="Custom Project Details"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Message</label>
              <textarea
                rows={4}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-cyan-400 transition resize-none"
                placeholder="Tell us about your requirements, project timelines, and goals..."
              />
            </div>

            <RippleButton
              type="submit"
              variant="default"
              className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-xl flex items-center justify-center gap-2 mt-2 transition"
            >
              <Send className="w-4 h-4" />
              Send Message
            </RippleButton>
          </form>

        </div>
      </section>
    </div>
  );
}
