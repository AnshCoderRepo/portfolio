"use client";

import FolderInteraction from "@/components/ui/folder";
import { Sparkles } from "lucide-react";

export default function FolderSection() {
  return (
    <section className="py-24 w-full bg-neutral-950 relative overflow-hidden flex flex-col items-center justify-center border-t border-neutral-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      
      <div className="max-w-xl text-center space-y-4 px-4 mb-12 z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur text-[10px] font-mono text-purple-400 uppercase tracking-widest mx-auto">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Experience
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Sleek Autopilot File Interaction
        </h2>
        <p className="text-sm text-neutral-400 max-w-md mx-auto">
          Click the folder to experience smooth spring physics, responsive card rotation, and tactile vector feedback.
        </p>
      </div>

      <div className="w-full max-w-md mx-auto flex items-center justify-center p-6 bg-neutral-900/20 border border-neutral-900/80 rounded-3xl backdrop-blur-md shadow-2xl relative min-h-[380px] z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-3xl" />
        <FolderInteraction />
      </div>
    </section>
  );
}
