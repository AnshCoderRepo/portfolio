"use client";

import Hero from "@/components/sections/hero";
import { FloatingIconsHero } from "@/components/ui/floating-icons-hero-section";
import { CountdownBanner } from "@/components/sections/the-future-arrives-soon-cta";
import FolderSection from "@/components/sections/folder-section";
import ClippedVideoTab from "@/components/ui/clipped-video-tab";
import StatsSection from "@/components/sections/stats-section";
import TestimonialCarousel from "@/components/ui/testimonial-carousel";
import RevealSection from "@/components/ui/reveal-section";
import SkillRadar from "@/components/ui/skill-radar";
import ProjectCostEstimator from "@/components/sections/project-cost-estimator";

// Icons for the floating hero section
import { Server, Database, Cpu, Layers, Cloud, Shield, Code, GitBranch, Zap, Globe, Lock, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full bg-background min-h-screen text-foreground">
      <Hero />
      <FloatingIconsHero
        title="A World of Innovation"
        subtitle="Explore a universe of possibilities with our platform, connecting you to the tools and technologies that shape the future."
        ctaText="Join the Revolution"
        ctaHref="#"
        icons={[
          { id: 1, icon: Server, className: 'top-[10%] left-[10%]', href: '/projects', label: 'Cloud Systems' },
          { id: 2, icon: Database, className: 'top-[20%] right-[8%]', href: '/projects', label: 'Database' },
          { id: 3, icon: Cpu, className: 'top-[80%] left-[10%]', href: '/projects', label: 'AI / ML' },
          { id: 4, icon: Layers, className: 'bottom-[10%] right-[10%]', href: '/projects', label: 'Web Dev' },
          { id: 5, icon: Cloud, className: 'top-[5%] left-[30%]', href: '/story', label: 'Our Story' },
          { id: 6, icon: Shield, className: 'top-[5%] right-[30%]', href: '/career', label: 'Career' },
          { id: 7, icon: Code, className: 'bottom-[8%] left-[25%]', href: '/models', label: 'Models' },
          { id: 8, icon: GitBranch, className: 'top-[40%] left-[15%]', href: '/story', label: 'Our Journey' },
          { id: 9, icon: Zap, className: 'top-[75%] right-[25%]', href: '/projects', label: 'Performance' },
          { id: 10, icon: Globe, className: 'top-[90%] left-[70%]', href: '/contact', label: 'Contact Us' },
          { id: 11, icon: Lock, className: 'top-[50%] right-[5%]', href: '/career', label: 'Security' },
          { id: 12, icon: Terminal, className: 'top-[55%] left-[5%]', href: '/projects', label: 'Engineering' },
        ]}
      />
      <StatsSection />
      <FolderSection />
      <ClippedVideoTab />
      
      {/* Interactive Scope & Cost Estimator */}
      <ProjectCostEstimator />
      
      {/* Testimonials Section */}
      <section className="relative py-20 sm:py-28">
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

      {/* Skills Radar Section */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <RevealSection className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full border border-accent-color/10 bg-accent-color/5 px-4 py-1.5 text-xs tracking-wider text-accent-color/60">
              OUR EXPERTISE
            </span>
            <h2 className="mt-4 text-3xl font-bold text-accent-color sm:text-4xl md:text-5xl">
              Technical Proficiency
            </h2>
          </RevealSection>
          <SkillRadar />
        </div>
      </section>

      <CountdownBanner />
    </div>
  );
}
