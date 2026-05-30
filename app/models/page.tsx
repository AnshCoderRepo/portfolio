"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Brain,
  Layers,
  Sparkles,
  Info,
  GitBranch,
  ShieldAlert,
  Sliders,
  ChevronRight
} from "lucide-react";

const models = [
  {
    id: "neural-v1",
    name: "Autopilot Neural Router v1.2",
    tagline: "High-Frequency Task Dispatcher",
    description: "An ultra-low latency transformer router that accurately parses customer queries and resolves direct agent routing pathways, reducing infrastructure routing overhead by up to 40%.",
    parameters: "1.4 Billion Parameters",
    tokens: "Up to 32k context length",
    latency: "38ms inference speed",
    accuracy: "99.1% parsing precision",
    useCase: "Customer intent mapping & smart routing microservices.",
    specs: {
      Architecture: "Decoder-only MoE (Mixture of Experts)",
      Framework: "PyTorch & TensorRT",
      Dataset: "12M cleaned client support sessions"
    },
    icon: Brain,
    color: "from-indigo-500 to-cyan-500",
    gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)"
  },
  {
    id: "vision-v4",
    name: "Vortex Vision Engine v4.0",
    tagline: "Multimodal Visual Analysis & QA",
    description: "High-throughput vision model optimized for instant image labeling, spatial object detection, and multimodal pipeline quality control with sub-100ms response cycles.",
    parameters: "840 Million Parameters",
    tokens: "Multimodal / Image Embeddings",
    latency: "85ms processing speed",
    accuracy: "98.5% detection recall",
    useCase: "Enterprise QA audits, automated invoice labeling, and visual transcription.",
    specs: {
      Architecture: "ViT (Vision Transformer) + CNN Backbone",
      Framework: "JAX & OpenXLA",
      Dataset: "400M multi-category labeled image sets"
    },
    icon: Cpu,
    color: "from-purple-500 to-pink-500",
    gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)"
  },
  {
    id: "vector-v2",
    name: "Tactile Vector Optimizer v2.5",
    tagline: "Physics-Based Vector Rendering",
    description: "Our proprietary browser-side mathematical system engineered to render spring-physics vector animations, rotating cards, and fluid interactive containers smoothly.",
    parameters: "Web Assembly (Wasm) Engine",
    tokens: "Direct vector coordinates",
    latency: "0.2ms local render loop",
    accuracy: "60 FPS hardware accelerated",
    useCase: "Stunning web layouts, smooth hover animations, and advanced fluid dynamics.",
    specs: {
      Architecture: "Wasm + Canvas WebGL Pipeline",
      Framework: "Rust & AssemblyScript",
      Dataset: "100% Client-Side Physics Simulation"
    },
    icon: Layers,
    color: "from-emerald-500 to-teal-500",
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)"
  }
];

export default function ModelsPage() {
  const [selectedModel, setSelectedModel] = useState(0);
  const model = models[selectedModel];
  const ModelIcon = model.icon;

  return (
    <div className="bg-black text-neutral-100 min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-900/5 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur text-[10px] font-mono text-purple-400 uppercase tracking-widest mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            Proprietary IP
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Intelligent Models
          </h1>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            Discover our active neural architectures, real-time vision systems, and rendering models custom engineered to scale client projects.
          </p>
        </div>

        {/* Dynamic Model Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Models selector cards */}
          <div className="lg:col-span-5 space-y-4">
            {models.map((m, idx) => {
              const MIcon = m.icon;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedModel(idx)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    selectedModel === idx
                      ? "bg-neutral-900/80 border-purple-500/40 shadow-xl shadow-purple-500/5"
                      : "bg-neutral-950/40 border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/20"
                  }`}
                  style={{
                    backgroundImage: selectedModel === idx ? m.gradient : "none"
                  }}
                >
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${m.color} text-white h-fit`}>
                      <MIcon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg text-white leading-tight">{m.name}</h3>
                      <p className="text-xs text-neutral-400 font-medium">{m.tagline}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs font-mono text-neutral-500">
                    <span>{m.parameters}</span>
                    <span className="flex items-center gap-1 text-purple-400 font-semibold group">
                      View details <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Model Workbench */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-900/20 border border-neutral-900 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                <ModelIcon className="w-48 h-48 text-white" />
              </div>

              {/* Title & Tag */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded bg-gradient-to-r ${model.color} text-[10px] font-mono font-bold uppercase text-white`}>
                    Active Production
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{model.name}</h2>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed">{model.description}</p>
              </div>

              {/* Stats Bench */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-neutral-950/60 border border-neutral-900 rounded-xl p-3.5 text-center">
                  <div className="text-[9px] uppercase font-mono text-neutral-500 tracking-wider mb-1">Scale</div>
                  <div className="text-xs font-bold text-white font-mono">{model.parameters}</div>
                </div>
                <div className="bg-neutral-950/60 border border-neutral-900 rounded-xl p-3.5 text-center">
                  <div className="text-[9px] uppercase font-mono text-neutral-500 tracking-wider mb-1">Latency</div>
                  <div className="text-xs font-bold text-emerald-400 font-mono">{model.latency}</div>
                </div>
                <div className="bg-neutral-950/60 border border-neutral-900 rounded-xl p-3.5 text-center">
                  <div className="text-[9px] uppercase font-mono text-neutral-500 tracking-wider mb-1">Context</div>
                  <div className="text-xs font-bold text-white font-mono">{model.tokens}</div>
                </div>
                <div className="bg-neutral-950/60 border border-neutral-900 rounded-xl p-3.5 text-center">
                  <div className="text-[9px] uppercase font-mono text-neutral-500 tracking-wider mb-1">Accuracy</div>
                  <div className="text-xs font-bold text-purple-400 font-mono">{model.accuracy}</div>
                </div>
              </div>

              {/* Specs and Technical architecture */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase font-mono text-neutral-500 tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-purple-400" /> Specifications & Sandbox Metrics
                </h3>
                <div className="bg-neutral-950/40 border border-neutral-900 rounded-2xl overflow-hidden divide-y divide-neutral-900">
                  {Object.entries(model.specs).map(([key, val]) => (
                    <div key={key} className="grid grid-cols-3 p-4 text-xs font-mono">
                      <div className="text-neutral-500 uppercase">{key}</div>
                      <div className="col-span-2 text-neutral-200 font-semibold">{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Case alert */}
              <div className="flex gap-3.5 p-4 rounded-xl bg-neutral-950/80 border border-neutral-900">
                <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-neutral-300">Recommended Use Case</div>
                  <div className="text-neutral-400 leading-relaxed">{model.useCase}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
