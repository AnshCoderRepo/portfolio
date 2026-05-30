"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  Briefcase,
  Compass,
  Users,
  Award,
  Zap,
  Globe
} from "lucide-react";

const positions = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-Time",
    salary: "$140k - $180k",
    description: "Lead the development of next-generation distributed web systems using React 19, Next.js 16, and high-performance server runtimes.",
    requirements: [
      "5+ years professional experience with React/Next.js and modern serverless platforms.",
      "Expert knowledge of DB optimizations (Postgres, Redis) and real-time streaming architectures.",
      "Passion for sleek user interactions, motion physics, and clean structural design."
    ]
  },
  {
    title: "AI Reasoning Researcher",
    department: "Artificial Intelligence",
    location: "San Francisco, CA / Hybrid",
    type: "Full-Time",
    salary: "$180k - $240k",
    description: "Design and implement custom feedback loops, self-correction algorithms, and complex reasoning pipelines on top of LLMs.",
    requirements: [
      "Strong background in PyTorch, Python, LLM fine-tuning, and inference scaling.",
      "Deep understanding of reinforcement learning, prompt reasoning topologies, and multimodal models.",
      "Contributions to open-source AI projects or publications at NeurIPS/ICML is a big plus."
    ]
  },
  {
    title: "Creative Systems Designer",
    department: "Design & UX",
    location: "London, UK / Remote",
    type: "Full-Time",
    salary: "$110k - $150k",
    description: "Craft premium digital experiences, high-fidelity UI systems, and customized animation components that push modern web boundaries.",
    requirements: [
      "Portfolio showcasing breathtaking visual design, customized vector systems, and interactive motion prototypes.",
      "Proficient in TailwindCSS, CSS variables, Framer Motion, and GSAP.",
      "Ability to translate complex user workflows into intuitive, micro-animated digital products."
    ]
  }
];

export default function CareerPage() {
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  return (
    <div className="bg-black text-neutral-100 min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur text-[10px] font-mono text-purple-400 uppercase tracking-widest mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            Join The Squad
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Build The Future
          </h1>
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
            We are looking for exceptional builders, designers, and systems architects to help us define the next decade of digital solutions.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <div className="bg-neutral-900/25 border border-neutral-900 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-white mb-2">Remote-First Culture</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Work from wherever you are happiest. We support a completely distributed team across 12+ timezones.
            </p>
          </div>
          <div className="bg-neutral-900/25 border border-neutral-900 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-white mb-2">Peak Infrastructure</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Get fully equipped with high-performance laptops, secondary screens, and robust cloud development boxes.
            </p>
          </div>
          <div className="bg-neutral-900/25 border border-neutral-900 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-white mb-2">Growth & Support</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Annual wellness allowance, paid conference visits, continuous mentorship, and fully transparent equity plans.
            </p>
          </div>
        </div>

        {/* Job Board */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight flex items-center gap-3">
            <Briefcase className="text-purple-400 w-6 h-6" /> Open Opportunities
          </h2>
          <div className="space-y-4">
            {positions.map((pos, idx) => (
              <div
                key={idx}
                className="bg-neutral-900/20 border border-neutral-900 rounded-2xl hover:border-purple-500/30 transition-all duration-300 overflow-hidden"
              >
                <div 
                  className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                  onClick={() => setSelectedPosition(selectedPosition === idx ? null : idx)}
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-purple-950/60 border border-purple-500/30 text-[10px] uppercase font-mono tracking-wider text-purple-400">
                        {pos.department}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {pos.location}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {pos.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{pos.title}</h3>
                  </div>

                  <div className="flex items-center gap-4 justify-between md:justify-end">
                    <span className="text-sm font-semibold text-neutral-300 font-mono">{pos.salary}</span>
                    <button 
                      className={`p-2.5 rounded-full border transition-all duration-300 ${
                        selectedPosition === idx 
                          ? "bg-white border-white text-black -rotate-90" 
                          : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white"
                      }`}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {selectedPosition === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-neutral-900 bg-neutral-950/30"
                    >
                      <div className="p-6 md:p-8 space-y-6">
                        <div className="space-y-2">
                          <h4 className="text-xs uppercase font-mono text-neutral-500 tracking-wider">About the Role</h4>
                          <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-4xl">
                            {pos.description}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xs uppercase font-mono text-neutral-500 tracking-wider">Candidate Requirements</h4>
                          <ul className="space-y-2">
                            {pos.requirements.map((req, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                                <span className="leading-relaxed">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4">
                          <button className="px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors font-medium text-sm flex items-center gap-2">
                            Apply for this position <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
