"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import Three.js 3D WebGL scene on client only with zero SSR interference
const AgenticFactory3D = dynamic(
  () => import("@/components/ui/agentic-factory-3d"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[100vh] bg-black flex items-center justify-center">
        <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs">
          <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span>Initializing SDLC Engine...</span>
        </div>
      </div>
    ),
  }
);

export default function Hero() {
  return (
    <section className="relative w-full h-[100svh] min-h-[640px] bg-black overflow-hidden select-none">
      {/* Full 3D Interactive WebGL Scene: completely unblocked for smooth animation, zooming, station clicking, and 360 rotation */}
      <AgenticFactory3D height="100%" embed={false} />
    </section>
  );
}
