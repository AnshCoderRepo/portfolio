"use client";

import { useState, useEffect } from "react";
import AnimatedCounter from "@/components/ui/animated-counter";
import RevealSection from "@/components/ui/reveal-section";
import { statsData } from "@/data/stats";
import type { StatItem } from "@/types";

export default function StatsSection() {
  const [stats, setStats] = useState<StatItem[]>(statsData);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setStats(data.data);
        }
      })
      .catch(() => {});
  }, []);

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
          {stats.map((stat, index) => (
            <RevealSection key={`${stat.label}-${index}`} delay={index * 0.1}>
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
