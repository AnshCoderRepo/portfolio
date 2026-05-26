"use client";

import DemoOne from "@/components/ui/demos/DemoOne";
import { ArrowLeft, Sparkles, Code, Terminal, Layers } from "lucide-react";
import Link from "next/link";

export default function FolderDemoPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-between p-6 relative overflow-hidden select-none">
      {/* Background radial gradients for ambient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-4xl flex items-center justify-between z-10 py-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-all group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur text-[10px] font-mono text-neutral-400 tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          INTERACTIVE DEMO
        </div>
      </div>

      {/* Hero / Main Section */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-xl z-10 py-12">
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-400">
            Interactive Folder Component
          </h1>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            Click the folder to experience smooth spring physics, micro-interactions, and detailed tab styling.
          </p>
        </div>

        {/* Demo Area */}
        <div className="w-full bg-neutral-900/40 border border-neutral-800/80 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative flex items-center justify-center min-h-[420px]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-3xl" />
          <DemoOne />
        </div>

        {/* Instructions / Interactions Hint */}
        <p className="text-xs text-neutral-500 mt-6 font-medium tracking-wide">
          ✨ Click the front flap or pages to open/close the folder.
        </p>
      </div>

      {/* Feature cards footer */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 z-10 mt-auto pt-6 border-t border-neutral-900">
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-900/20 border border-neutral-900/60">
          <Layers className="w-5 h-5 text-purple-400 mt-0.5" />
          <div>
            <h3 className="text-xs font-semibold text-neutral-200">Layer Depth</h3>
            <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
              SVG shadow styling and dynamic z-index transitions give pages true spatial depth.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-900/20 border border-neutral-900/60">
          <Sparkles className="w-5 h-5 text-indigo-400 mt-0.5" />
          <div>
            <h3 className="text-xs font-semibold text-neutral-200">Spring Physics</h3>
            <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
              Powered by Motion spring transitions to feel premium, natural, and responsive.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-900/20 border border-neutral-900/60">
          <Code className="w-5 h-5 text-emerald-400 mt-0.5" />
          <div>
            <h3 className="text-xs font-semibold text-neutral-200">SVG Flares</h3>
            <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
              Iconic folder tab notch and specular highlights render cleanly using vectorized paths.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
