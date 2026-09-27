// src/components/ui/cinematic-landing-hero.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Send, Server, Cpu, Layers, ShieldCheck, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  /* High-Performance Lightweight Ambient Lighting */
  .bg-grid-theme {
      background-size: 40px 40px;
      background-image: 
          linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
      will-change: transform, opacity;
  }

  .hero-spotlight {
      position: absolute;
      top: -15%;
      left: 50%;
      transform: translateX(-50%) translateZ(0);
      width: min(1100px, 100vw);
      height: 600px;
      background: radial-gradient(ellipse at center, rgba(6, 182, 212, 0.22) 0%, rgba(99, 102, 241, 0.12) 45%, transparent 70%);
      filter: blur(50px);
      pointer-events: none;
      z-index: 1;
  }

  .hero-orb-1 {
      position: absolute;
      top: 15%;
      left: 10%;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, transparent 70%);
      filter: blur(70px);
      pointer-events: none;
      z-index: 1;
      transform: translateZ(0);
  }

  .hero-orb-2 {
      position: absolute;
      bottom: 15%;
      right: 10%;
      width: 450px;
      height: 450px;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, transparent 70%);
      filter: blur(80px);
      pointer-events: none;
      z-index: 1;
      transform: translateZ(0);
  }

  /* -------------------------------------------------------------------
     PHYSICAL SKEUOMORPHIC MATERIALS & TYPOGRAPHY
  ---------------------------------------------------------------------- */
  
  .text-3d-matte {
      color: #FFFFFF;
      text-shadow: 
          0 8px 30px rgba(0, 0, 0, 0.9), 
          0 2px 8px rgba(6, 182, 212, 0.3);
  }

  .text-cyan-glow {
      background: linear-gradient(135deg, #FFFFFF 0%, #67E8F9 35%, #38BDF8 70%, #A78BFA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 0 25px rgba(6, 182, 212, 0.45));
  }

  .text-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: drop-shadow(0px 6px 20px rgba(0, 0, 0, 0.7));
  }

  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: drop-shadow(0px 8px 16px rgba(0,0,0,0.8));
  }

  /* Deep Physical Card with GPU acceleration */
  .premium-depth-card {
      background: linear-gradient(145deg, #132454 0%, #070D18 100%);
      box-shadow: 
          0 30px 80px -20px rgba(0, 0, 0, 0.9),
          inset 0 1px 2px rgba(255, 255, 255, 0.25),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.12);
      transform: translateZ(0);
      backface-visibility: hidden;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 30;
      background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .iphone-bezel {
      background-color: #111;
      box-shadow: 
          inset 0 0 0 2px #52525B, 
          inset 0 0 0 6px #000, 
          0 25px 50px -15px rgba(0,0,0,0.9);
      transform-style: preserve-3d;
      backface-visibility: hidden;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow: -2px 0 5px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.06);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%);
      backdrop-filter: blur(16px); 
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.15),
          0 15px 30px -10px rgba(0, 0, 0, 0.8);
  }

  .btn-modern-light, .btn-modern-dark {
      transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
      color: #0F172A;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3);
  }
  .btn-modern-light:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 16px 28px -6px rgba(0,0,0,0.4);
  }
  .btn-modern-dark {
      background: linear-gradient(180deg, #27272A 0%, #18181B 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9);
  }
  .btn-modern-dark:hover {
      transform: translateY(-2px);
      background: linear-gradient(180deg, #3F3F46 0%, #27272A 100%);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.7), 0 16px 28px -6px rgba(0,0,0,1);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  subtitle?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  badge1Title?: string;
  badge1Subtitle?: string;
  badge1Icon?: string;
  badge2Title?: string;
  badge2Subtitle?: string;
  badge2Icon?: string;
  phoneAppTitle?: string;
  phoneAppSubtitle?: string;
  phoneAppAvatar?: string;
  phoneWidget1Title?: string;
  phoneWidget1Subtitle?: string;
  phoneWidget2Title?: string;
  phoneWidget2Subtitle?: string;
}

export function CinematicHero({ 
  brandName = "ASSOLUTIONS",
  tagline1 = "Engineering Tomorrow's,",
  tagline2 = "Digital Solutions.",
  subtitle = "Crafting high-performance web systems, cloud architectures, and bespoke AI integrations engineered for effortless scale.",
  cardHeading = "Enterprise Quality, Freelance Agility.",
  cardDescription = (
    <>
      <span className="text-white font-semibold">ASSolutions</span> is an elite engineering collective founded by{" "}
      <span className="text-cyan-400 font-semibold">Ansh Coder</span>, transforming client visions into high-performance web systems, cloud architectures, and bespoke AI integrations.
    </>
  ),
  metricValue = 50,
  metricLabel = "Projects Delivered",
  ctaHeading = "Build your next big idea.",
  ctaDescription = "Partner with ASSolutions to launch resilient web systems, cloud backends, and AI architectures engineered for scale.",
  primaryCtaText = "Explore Projects",
  primaryCtaHref = "/projects",
  secondaryCtaText = "Get In Touch",
  secondaryCtaHref = "/contact",
  badge1Title = "50+ Shipped",
  badge1Subtitle = "100% Production Ready",
  badge1Icon = "⚡",
  badge2Title = "Ansh Coder",
  badge2Subtitle = "Lead Systems Architect",
  badge2Icon = "💎",
  phoneAppTitle = "ASSolutions",
  phoneAppSubtitle = "Active Cloud & AI Node",
  phoneAppAvatar = "AC",
  phoneWidget1Title = "Cloud Infrastructure",
  phoneWidget1Subtitle = "0.4ms Latency • 50k req/s",
  phoneWidget2Title = "Neural AI Workflows",
  phoneWidget2Subtitle = "99.2% Accuracy • 128k Tokens",
  className, 
  ...props 
}: CinematicHeroProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // 1. High-Performance Mouse Interaction Logic (Desktop only with passive listener)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 1.5) return;

      cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 8,
            rotationX: -yVal * 8,
            ease: "power2.out",
            duration: 0.8,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Responsive & Optimized GSAP Scroll Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      // Position the 3D card off-screen initially
      gsap.set(".main-card", { y: "115vh", autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.9, pointerEvents: "none" });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=1800" : "+=2400", // Snappy scroll distance for high responsiveness
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // 1. Fast, fluid scroll transformation
      scrollTl
        .to(".hero-text-wrapper", { 
          y: -60,
          scale: 0.96, 
          filter: "blur(8px)", 
          autoAlpha: 0, 
          ease: "power2.inOut", 
          duration: 1.2 
        }, 0)
        .to(".hero-scroll-indicator", { 
          autoAlpha: 0, 
          y: 15, 
          duration: 0.6 
        }, 0)
        .to(".main-card", { 
          y: 0, 
          ease: "power3.out", 
          duration: 1.6 
        }, 0.1)
        .to(".main-card", { 
          width: "100%", 
          height: "100%", 
          borderRadius: "0px", 
          ease: "power3.inOut", 
          duration: 1.0 
        })
        .fromTo(".mockup-scroll-wrapper",
          { y: 120, z: -180, rotationX: 18, rotationY: -8, autoAlpha: 0, scale: isMobile ? 0.72 : 0.88 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "power2.out", duration: 1.4 }, "-=0.6"
        )
        .fromTo(".phone-widget", 
          { y: 20, autoAlpha: 0 }, 
          { y: 0, autoAlpha: 1, stagger: 0.08, ease: "power2.out", duration: 0.8 }, "-=0.8"
        )
        .to(".progress-ring", { strokeDashoffset: 60, duration: 1.2, ease: "power2.inOut" }, "-=0.8")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 1.2, ease: "power2.out" }, "-=1.2")
        .fromTo(".floating-badge", 
          { y: 35, autoAlpha: 0, scale: 0.9 }, 
          { y: 0, autoAlpha: 1, scale: 1, ease: "power2.out", duration: 0.8, stagger: 0.1 }, "-=1.0"
        )
        .fromTo(".card-left-text", 
          { x: isMobile ? 0 : -25, y: isMobile ? 15 : 0, autoAlpha: 0 }, 
          { x: 0, y: 0, autoAlpha: 1, ease: "power2.out", duration: 0.8 }, "-=0.8"
        )
        .fromTo(".card-right-text", 
          { x: isMobile ? 0 : 25, y: isMobile ? -15 : 0, autoAlpha: 0, scale: 0.95 }, 
          { x: 0, y: 0, autoAlpha: 1, scale: 1, ease: "power2.out", duration: 0.8 }, "<"
        )
        .to({}, { duration: 1.0 })
        
        // 2. Final Phase: Transition from Card to CTA
        .set(".cta-wrapper", { pointerEvents: "auto" })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.92, y: -20, autoAlpha: 0, ease: "power2.in", duration: 0.8, stagger: 0.03,
        })
        .to(".main-card", { 
          width: isMobile ? "94vw" : isTablet ? "90vw" : "85vw", 
          height: isMobile ? "90vh" : isTablet ? "88vh" : "85vh", 
          borderRadius: isMobile ? "20px" : "32px", 
          ease: "power2.inOut", 
          duration: 1.0 
        }, "pullback") 
        .to(".cta-wrapper", { autoAlpha: 1, scale: 1, ease: "power2.inOut", duration: 1.0 }, "pullback")
        .to(".main-card", { y: "-115vh", ease: "power2.in", duration: 0.9 });

    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]); 

  return (
    <section
      ref={containerRef}
      aria-label="Hero Section"
      className={cn("relative w-full h-[100dvh] min-h-[580px] overflow-hidden flex items-center justify-center bg-[#030611] text-foreground font-sans antialiased", className)}
      style={{ perspective: "1200px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      
      {/* Background Ambience & Lighting */}
      <div className="hero-ambient-glows absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="hero-spotlight" />
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="bg-grid-theme absolute inset-0 opacity-80" aria-hidden="true" />
      </div>

      {/* BACKGROUND LAYER 1: Rich Cinematic Intro Hero Section */}
      <div className="hero-text-wrapper absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none will-change-transform max-w-6xl mx-auto">
        
        {/* 1. Status Pill Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 backdrop-blur-xl text-cyan-300 text-xs sm:text-sm font-medium tracking-wide mb-3 sm:mb-5 shadow-[0_0_25px_rgba(6,182,212,0.25)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-neutral-200 font-semibold tracking-normal">ASSolutions Studio</span>
          <span className="text-cyan-400/50">•</span>
          <span className="text-cyan-300 font-mono text-[11px] sm:text-xs flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Next-Gen Systems & AI
          </span>
        </div>

        {/* 2. Main High-Impact Typography */}
        <h1 className="text-track text-3d-matte text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-1 sm:mb-2 max-w-5xl leading-[1.08]">
          {tagline1}
        </h1>
        <h1 className="text-days text-cyan-glow text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight max-w-5xl leading-[1.08] mb-3 sm:mb-5">
          {tagline2}
        </h1>

        {/* 3. Captivating Subtitle */}
        <p className="hero-subtitle text-xs sm:text-base md:text-lg lg:text-xl text-neutral-300/90 max-w-2xl mx-auto font-light leading-relaxed mb-4 sm:mb-7 text-balance px-2">
          {subtitle}
        </p>

        {/* 4. Tech Feature Tags */}
        <div className="hero-pills flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-neutral-300 font-mono">
          <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
            <Server className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-cyan-400" />
            <span>Cloud & Microservices</span>
          </div>
          <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
            <Cpu className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-purple-400" />
            <span>Neural AI Architectures</span>
          </div>
          <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
            <Layers className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-blue-400" />
            <span>Full-Stack Ecosystems</span>
          </div>
          <div className="hidden md:flex px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 backdrop-blur-md items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Production Grade</span>
          </div>
        </div>
      </div>

      {/* Interactive Scroll Down Prompt */}
      <div className="hero-scroll-indicator absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-md shadow-xl shadow-black/60">
          <div className="w-2 h-4 rounded-full border border-cyan-400/80 p-0.5 flex justify-center">
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" />
          </div>
          <span className="text-[10px] sm:text-[11px] tracking-widest uppercase font-bold text-neutral-200 font-mono">
            Scroll to explore
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-cyan-400 animate-pulse ml-0.5" />
        </div>
      </div>

      {/* BACKGROUND LAYER 2: CTA Buttons Layer */}
      <div className="cta-wrapper absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none will-change-transform max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-5 tracking-tight text-silver-matte leading-tight">
          {ctaHeading}
        </h2>
        <p className="text-muted-foreground text-xs sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full max-w-md sm:max-w-none pointer-events-auto">
          <Link
            href={primaryCtaHref}
            className="btn-modern-light w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl group focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 transition-transform group-hover:rotate-12" />
            <div className="text-left">
              <div className="text-[9px] font-bold tracking-wider text-neutral-500 uppercase leading-none mb-0.5">Discover Work</div>
              <div className="text-sm sm:text-base font-bold leading-none tracking-tight">{primaryCtaText}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-600 transition-transform group-hover:translate-x-1 ml-1" />
          </Link>
          <Link
            href={secondaryCtaHref}
            className="btn-modern-dark w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl group focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 transition-transform group-hover:scale-110" />
            <div className="text-left">
              <div className="text-[9px] font-bold tracking-wider text-neutral-400 uppercase leading-none mb-0.5">Start A Project</div>
              <div className="text-sm sm:text-base font-bold leading-none tracking-tight">{secondaryCtaText}</div>
            </div>
          </Link>
        </div>
      </div>

      {/* FOREGROUND LAYER: The Physical Deep Blue 3D Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1200px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden flex items-center justify-center pointer-events-auto w-[94vw] sm:w-[90vw] lg:w-[85vw] h-[90vh] sm:h-[88vh] lg:h-[85vh] rounded-2xl sm:rounded-[32px] lg:rounded-[36px] p-3 sm:p-6 lg:p-8"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* DYNAMIC RESPONSIVE CONTAINER */}
          <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 items-center justify-between lg:justify-center gap-3 sm:gap-4 lg:gap-8 z-10 py-2 sm:py-4 lg:py-0 overflow-y-auto lg:overflow-visible">
            
            {/* 1. LEFT COLUMN */}
            <div className="card-left-text order-3 lg:order-1 lg:col-span-4 flex flex-col justify-center text-center lg:text-left z-20 w-full px-2 sm:px-4 lg:px-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] sm:text-xs font-mono uppercase tracking-wider mb-2 sm:mb-3 mx-auto lg:mx-0 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Elite Engineering Collective
              </div>
              <h3 className="text-white text-base sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 tracking-tight leading-snug">
                {cardHeading}
              </h3>
              <p className="text-blue-100/75 text-xs sm:text-sm font-normal leading-relaxed mx-auto lg:mx-0 max-w-md lg:max-w-none">
                {cardDescription}
              </p>
            </div>

            {/* 2. CENTER COLUMN: iPhone Mockup */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 lg:col-span-4 relative w-full flex items-center justify-center z-10 py-1 sm:py-3">
              
              {/* Responsive Phone Scaling Wrapper */}
              <div className="relative flex items-center justify-center scale-[0.58] xs:scale-[0.66] sm:scale-80 md:scale-90 lg:scale-[0.88] xl:scale-100 origin-center transition-transform">
                
                {/* The iPhone Bezel */}
                <div
                  ref={mockupRef}
                  className="relative w-[270px] h-[520px] rounded-[2.8rem] iphone-bezel flex flex-col will-change-transform shadow-2xl"
                >
                  {/* Physical Hardware Buttons */}
                  <div className="absolute top-[110px] -left-[3px] w-[3px] h-[22px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[145px] -left-[3px] w-[3px] h-[40px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[200px] -left-[3px] w-[3px] h-[40px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[155px] -right-[3px] w-[3px] h-[65px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {/* Inner Screen Container */}
                  <div className="absolute inset-[6px] bg-[#050914] rounded-[2.4rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10 flex flex-col">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Island Notch */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
                    </div>

                    {/* App Interface */}
                    <div className="relative w-full h-full pt-9 px-4 pb-5 flex flex-col justify-between">
                      
                      {/* Top Bar */}
                      <div className="phone-widget flex justify-between items-center mb-1">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-cyan-400 uppercase tracking-widest font-bold mb-0.5">{phoneAppTitle}</span>
                          <span className="text-xs sm:text-sm font-bold tracking-tight text-white">{phoneAppSubtitle}</span>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-cyan-500/10 text-cyan-300 flex items-center justify-center font-bold text-xs border border-cyan-500/20 shadow-md shadow-black/50">
                          {phoneAppAvatar}
                        </div>
                      </div>

                      {/* Radial Metric Ring */}
                      <div className="phone-widget relative w-32 h-32 mx-auto flex items-center justify-center my-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 176 176" aria-hidden="true">
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="10" />
                          <circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#06b6d4" strokeWidth="10" />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <div className="flex items-baseline justify-center">
                            <span className="counter-val text-2xl sm:text-3xl font-extrabold tracking-tighter text-white">0</span>
                            <span className="text-base sm:text-lg font-bold text-cyan-400 ml-0.5">+</span>
                          </div>
                          <span className="text-[7.5px] text-cyan-200/70 uppercase tracking-[0.1em] font-bold mt-0.5">{metricLabel}</span>
                        </div>
                      </div>

                      {/* App Widgets */}
                      <div className="space-y-1.5 mt-auto">
                        <div className="phone-widget widget-depth rounded-xl p-2 flex items-center">
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/10 flex items-center justify-center mr-2 border border-cyan-400/20 shadow-inner flex-shrink-0">
                            <Server className="w-3 h-3 text-cyan-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] sm:text-[11px] font-bold text-white tracking-tight truncate">{phoneWidget1Title}</div>
                            <div className="text-[8px] sm:text-[9px] text-cyan-200/60 font-mono truncate">{phoneWidget1Subtitle}</div>
                          </div>
                        </div>
                        <div className="phone-widget widget-depth rounded-xl p-2 flex items-center">
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-600/10 flex items-center justify-center mr-2 border border-purple-400/20 shadow-inner flex-shrink-0">
                            <Cpu className="w-3 h-3 text-purple-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] sm:text-[11px] font-bold text-white tracking-tight truncate">{phoneWidget2Title}</div>
                            <div className="text-[8px] sm:text-[9px] text-purple-200/60 font-mono truncate">{phoneWidget2Subtitle}</div>
                          </div>
                        </div>
                      </div>

                      {/* Home Indicator */}
                      <div className="w-[80px] h-[3px] bg-white/20 rounded-full mx-auto mt-2" />
                    </div>
                  </div>
                </div>

                {/* Floating Glass Badges */}
                <div className="floating-badge absolute -top-3 -left-4 sm:-left-10 lg:-left-14 floating-ui-badge rounded-xl p-2 sm:p-3 flex items-center gap-2 z-30 pointer-events-none max-w-[180px]">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-b from-cyan-500/20 to-blue-900/20 flex items-center justify-center border border-cyan-400/30 shadow-inner flex-shrink-0">
                    <span className="text-xs sm:text-sm" aria-hidden="true">{badge1Icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-[11px] sm:text-xs font-bold tracking-tight truncate">{badge1Title}</p>
                    <p className="text-cyan-200/70 text-[8px] sm:text-[10px] font-medium truncate">{badge1Subtitle}</p>
                  </div>
                </div>

                <div className="floating-badge absolute -bottom-3 -right-4 sm:-right-10 lg:-right-14 floating-ui-badge rounded-xl p-2 sm:p-3 flex items-center gap-2 z-30 pointer-events-none max-w-[180px]">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-b from-indigo-500/20 to-purple-900/20 flex items-center justify-center border border-indigo-400/30 shadow-inner flex-shrink-0">
                    <span className="text-xs sm:text-sm" aria-hidden="true">{badge2Icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-[11px] sm:text-xs font-bold tracking-tight truncate">{badge2Title}</p>
                    <p className="text-purple-200/70 text-[8px] sm:text-[10px] font-medium truncate">{badge2Subtitle}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. RIGHT COLUMN */}
            <div className="card-right-text order-1 lg:order-3 lg:col-span-4 flex justify-center lg:justify-end z-20 w-full px-2 sm:px-4 lg:px-0">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tighter text-card-silver-matte text-center lg:text-right leading-none break-words">
                {brandName}
              </h2>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default CinematicHero;
