"use client";

import Hero from "@/components/sections/hero";
import StatsSection from "@/components/sections/stats-section";
import ProjectCostEstimator from "@/components/sections/project-cost-estimator";
import TestimonialCarousel from "@/components/ui/testimonial-carousel";
import RevealSection from "@/components/ui/reveal-section";
import CtaSection from "@/components/sections/cta-section";

export default function Home() {
  return (
    <div className="w-full bg-background min-h-screen text-foreground">
      <Hero />
      <StatsSection />
      
      {/* Interactive Scope & Cost Estimator */}
      <ProjectCostEstimator />
      
      {/* Testimonials Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4">
          <RevealSection className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full border border-accent-color/10 bg-accent-color/5 px-4 py-1.5 text-xs tracking-wider text-accent-color/60">
              TESTIMONIALS
            </span>
            <h2 className="mt-4 text-3xl font-bold text-accent-color sm:text-4xl md:text-5xl">
              What Our Clients Say
            </h2>
          </RevealSection>
          <RevealSection direction="left" delay={0.1}>
            <TestimonialCarousel />
          </RevealSection>
        </div>
      </section>

      {/* Sleek Final Call to Action */}
      <CtaSection />
    </div>
  );
}
