"use client";

import AnimatedCounter from "@/components/ui/animated-counter";
import RevealSection from "@/components/ui/reveal-section";
import { statsData } from "@/data/stats";

export default function StatsSection() {
  return (
    <section className="relative py-20 sm:py-28">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-accent-color/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <RevealSection className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full border border-accent-color/10 bg-accent-color/5 px-4 py-1.5 text-xs tracking-wider text-accent-color/60">
            BY THE NUMBERS
          </span>
          <h2 className="mt-4 text-3xl font-bold text-accent-color sm:text-4xl md:text-5xl">
            Delivering Results That Matter
          </h2>
        </RevealSection>

        <div className="grid grid-cols-2 gap-8 sm:gap-12 md:grid-cols-4">
          {statsData.map((stat, index) => (
            <RevealSection key={stat.label} delay={index * 0.1}>
              <AnimatedCounter
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
              />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
