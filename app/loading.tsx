"use client";

import { motion } from "framer-motion";

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <motion.div
      className={`rounded-lg bg-surface-alt ${className || ""}`}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-4xl space-y-8 px-4">
        {/* Hero skeleton */}
        <div className="space-y-4">
          <SkeletonPulse className="h-4 w-32" />
          <SkeletonPulse className="h-12 w-3/4" />
          <SkeletonPulse className="h-12 w-1/2" />
          <SkeletonPulse className="h-4 w-2/3" />
        </div>

        {/* Button skeleton */}
        <div className="flex gap-4">
          <SkeletonPulse className="h-12 w-40 rounded-full" />
          <SkeletonPulse className="h-12 w-40 rounded-full" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3 rounded-2xl border border-surface-border bg-surface-alt p-6">
              <SkeletonPulse className="h-32 w-full" />
              <SkeletonPulse className="h-4 w-3/4" />
              <SkeletonPulse className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
