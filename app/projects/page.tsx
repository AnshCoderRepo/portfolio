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
  GitBranch
} from "lucide-react";


const projects = [
  {
    title: "Nova Cloud Systems",
    subtitle: "High-Speed Server Architecture",
    description: "An enterprise-grade, microsecond-latency cloud router managing over 50,000 requests per second with built-in failover capabilities and intelligent load balancing.",
    category: "Cloud Infrastructure",
    tech: ["Go", "Kubernetes", "gRPC", "Redis", "AWS"],
    metrics: { speed: "0.4ms Latency", load: "50k req/s", uptime: "99.999%" },
    icon: Server,
    color: "from-blue-600 to-indigo-600",
    glow: "rgba(37, 99, 235, 0.15)",
    video: "https://res.cloudinary.com/dy4bqxt8p/video/upload/v1779622196/new107_qhrklf.mp4"
  },
  {
    title: "Vortex Intelligence",
    subtitle: "Multimodal AI Agent",
    description: "Advanced generative AI orchestrator featuring self-learning feedback loops, custom fine-tuning pipelines, and live voice/multimodal dataset ingestion.",
    category: "Artificial Intelligence",
    tech: ["Python", "PyTorch", "Next.js", "FastAPI", "OpenAI"],
    metrics: { accuracy: "99.2% Score", context: "128k Tokens", latency: "120ms" },
    icon: Cpu,
    color: "from-purple-600 to-pink-600",
    glow: "rgba(147, 51, 234, 0.15)",
    video: "https://res.cloudinary.com/dy4bqxt8p/video/upload/v1779622271/02_u2efg7.mp4"
  },
  {
    title: "Horizon Engine",
    subtitle: "Next.js Rendering Pipeline",
    description: "A proprietary web renderer built specifically on top of Next.js 16 to leverage edge caching, streaming HTML sections, and optimized CSS-in-JS compilation.",
    category: "Web Development",
    tech: ["Next.js 16", "React 19", "TailwindCSS", "Vercel"],
    metrics: { score: "100/100 Lighthouse", fcp: "0.2s", size: "12kb JS Core" },
    icon: Layers,
    color: "from-emerald-600 to-teal-600",
    glow: "rgba(5, 150, 105, 0.15)",
    video: "https://res.cloudinary.com/dy4bqxt8p/video/upload/v1779621768/new105_meaomd.mp4"
  },
  {
    title: "Titan Database Orchestrator",
    subtitle: "Real-Time Analytical Storage",
    description: "High-performance timeseries analytics engine designed for financial data ingestion, supporting sub-millisecond querying across billions of rows.",
    category: "Big Data & Storage",
    tech: ["Rust", "ClickHouse", "Kafka", "PostgreSQL"],
    metrics: { throughput: "2.4GB/sec", volume: "10B+ Rows", queryTime: "2ms Avg" },
    icon: Database,
    color: "from-amber-600 to-orange-600",
    glow: "rgba(217, 119, 6, 0.15)",
    video: "https://res.cloudinary.com/dy4bqxt8p/video/upload/v1779622220/new108_k1a47m.mp4"
  }
];

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState(0);
  const project = projects[activeProject];
  const IconComponent = project.icon;

  return (
    <div className="bg-black text-neutral-100 min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none transition-all duration-700" 
        style={{ backgroundColor: project.glow }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 items-end mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Elite Works
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Elite Engineering
            </h1>
          </div>
          <div>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
              A curated showcase of high-end backend, AI, and frontend architectures engineered for peak speed, reliability, and visual clarity.
            </p>
          </div>
        </div>

        {/* Dynamic Project Showcase Container */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            {projects.map((p, idx) => {
              const PIcon = p.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveProject(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    activeProject === idx
                      ? "bg-neutral-900/80 border-purple-500/50 shadow-lg shadow-purple-500/5"
                      : "bg-neutral-950/40 border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${p.color} bg-opacity-20 text-white`}>
                      <PIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 font-mono tracking-wider uppercase">{p.category}</div>
                      <div className={`font-semibold text-base transition-colors ${
                        activeProject === idx ? "text-white" : "text-neutral-300 group-hover:text-white"
                      }`}>{p.title}</div>
                    </div>
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    activeProject === idx ? "bg-purple-400 scale-125" : "bg-transparent group-hover:bg-neutral-700"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Interactive Showcase Screen */}
          <div className="lg:col-span-8">
            <div className="bg-neutral-900/40 border border-neutral-900 rounded-3xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              {/* Media Sandbox */}
              <div 
                className="relative overflow-hidden h-[340px] md:h-[400px] border border-neutral-800/80 rounded-2xl mb-8 group"
                style={{
                  clipPath: "polygon(0 0, 95% 0, 100% 6%, 100% 100%, 0 100%)"
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.video
                    key={project.title}
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/50" />
                
                {/* floating category badge */}
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-neutral-800 text-[10px] uppercase font-mono tracking-widest text-purple-400">
                  {project.category}
                </div>
              </div>

              {/* Title, description & badges */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{project.title}</h2>
                    <p className="text-sm font-mono text-purple-400">{project.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2.5 rounded-full bg-neutral-950/80 border border-neutral-800 text-neutral-400 hover:text-white transition-colors">
                      <GitBranch className="w-5 h-5" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors font-medium text-sm">
                      Live Demo <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 py-4 px-5 bg-neutral-950/60 border border-neutral-900 rounded-2xl">
                  {Object.entries(project.metrics).map(([key, val]) => (
                    <div key={key} className="text-center">
                      <div className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider mb-1">{key}</div>
                      <div className="text-sm md:text-base font-semibold text-neutral-200 font-mono">{val}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div>
                  <div className="text-xs uppercase font-mono text-neutral-500 tracking-wider mb-3">Technologies Leveraged</div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-md bg-neutral-900 border border-neutral-850 text-xs font-mono text-neutral-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
