"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Code,
  Shield,
  Layers,
  Sparkles,
  Server,
  Database,
  Cpu,
  GitBranch,
} from "lucide-react";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";

import { projects, projectHeroImages } from "@/data/projects";

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const project = activeProject !== null ? projects[activeProject] : null;

  return (
    <div className="bg-background text-accent-color min-h-screen relative overflow-hidden">
      {/* Hero corridor section */}
      <section className="relative h-screen">
        <ImageStreamHero
          images={projectHeroImages}
          cards={7}
          speed={20}
          axis={55}
          className="absolute inset-0"
        >
          <div className="relative z-10 flex h-full flex-col items-center justify-between py-16 sm:py-20 text-center pointer-events-none">
            <div className="px-6">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-accent-color/10 bg-accent-color/5 px-4 py-1.5 text-xs tracking-wider text-accent-color/60">
                <Sparkles className="w-3.5 h-3.5" />
                Elite Works
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-accent-color">
                Elite Engineering
              </h1>
              <p className="mt-4 max-w-lg mx-auto text-sm sm:text-base text-accent-color/60">
                A curated showcase of high-end backend, AI, and frontend
                architectures engineered for peak speed, reliability, and
                visual clarity.
              </p>
            </div>

            {/* Project selector pills at the bottom */}
            <div className="pointer-events-auto flex flex-wrap justify-center gap-3 px-4">
              {projects.map((p, idx) => {
                const PIcon = p.icon;
                return (
                  <button
                    key={idx}
                    onClick={() =>
                      setActiveProject(
                        activeProject === idx ? null : idx,
                      )
                    }
                    className={`group flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-medium backdrop-blur-md transition-all duration-300 ${
                      activeProject === idx
                        ? "bg-accent-color/15 border-accent-color/40 shadow-lg shadow-accent-color/5 text-accent-color"
                        : "bg-background/40 border-accent-color/10 text-accent-color/70 hover:bg-accent-color/10 hover:border-accent-color/20 hover:text-accent-color"
                    }`}
                  >
                    <PIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">{p.title}</span>
                    <span className="sm:hidden">{p.category}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </ImageStreamHero>

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
      </section>

      {/* Project detail panel — slides in below the corridor */}
      <AnimatePresence mode="wait">
        {project && (
          <motion.section
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative max-w-6xl mx-auto px-6 pb-24 -mt-16"
          >
            <div
              className="rounded-3xl border border-accent-color/10 bg-surface backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden"
              style={{
                boxShadow: `0 0 80px ${project.glow}`,
              }}
            >
              {/* Background glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-30 pointer-events-none"
                style={{ backgroundColor: project.glow }}
              />

              <div className="relative z-10 grid lg:grid-cols-5 gap-8">
                {/* Left — info */}
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 rounded-xl bg-gradient-to-br ${project.color}`}
                      >
                        <project.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-mono uppercase tracking-widest text-accent-color/50">
                        {project.category}
                      </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-accent-color tracking-tight">
                      {project.title}
                    </h2>
                    <p className="text-sm font-mono text-accent-color/50 mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-accent-color/70 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div>
                    <div className="text-xs uppercase font-mono text-accent-color/40 tracking-wider mb-3">
                      Technologies Leveraged
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-md bg-accent-color/5 border border-accent-color/10 text-xs font-mono text-accent-color/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-color text-background hover:opacity-90 transition-opacity font-medium text-sm">
                      Live Demo <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 rounded-full border border-accent-color/15 bg-accent-color/5 text-accent-color/60 hover:text-accent-color hover:border-accent-color/30 transition-colors">
                      <GitBranch className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Right — metrics */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                  <div className="text-xs uppercase font-mono text-accent-color/40 tracking-wider">
                    Key Metrics
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(project.metrics).map(([key, val]) => (
                      <div
                        key={key}
                        className="text-center p-4 rounded-2xl bg-accent-color/5 border border-accent-color/10"
                      >
                        <div className="text-[10px] uppercase font-mono text-accent-color/40 tracking-wider mb-1">
                          {key}
                        </div>
                        <div className="text-sm sm:text-base font-semibold text-accent-color font-mono">
                          {val}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Decorative terminal */}
                  <div className="mt-auto rounded-2xl border border-accent-color/10 bg-background/50 p-4 font-mono text-xs text-accent-color/50">
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                      <span className="ml-2 text-accent-color/30">terminal</span>
                    </div>
                    <div>
                      <span className="text-green-400/70">$</span> deploying{" "}
                      {project.title.toLowerCase().replace(/\s+/g, "-")}...
                    </div>
                    <div className="text-accent-color/30 mt-1">
                      ✓ build complete — 0 errors
                    </div>
                    <div className="text-accent-color/30">
                      ✓ {project.tech[0]} ready
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* All projects grid (when none selected) */}
      <AnimatePresence>
        {activeProject === null && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-6xl mx-auto px-6 pb-24"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {projects.map((p, idx) => {
                const PIcon = p.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveProject(idx)}
                    className="group text-left p-5 rounded-2xl border border-accent-color/10 bg-surface hover:border-accent-color/25 hover:bg-surface-alt transition-all duration-300"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project?.color || p.color} flex items-center justify-center mb-4`}
                    >
                      <PIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-[10px] uppercase font-mono text-accent-color/40 tracking-wider mb-1">
                      {p.category}
                    </div>
                    <div className="font-semibold text-accent-color mb-2 group-hover:text-accent-color/90 transition-colors">
                      {p.title}
                    </div>
                    <p className="text-xs text-accent-color/50 line-clamp-2">
                      {p.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
