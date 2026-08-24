"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

function GlitchText({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block">
      <span className="relative z-10">{text}</span>
      {glitch && (
        <>
          <span
            className="absolute left-0 top-0 z-20 animate-pulse"
            style={{ color: "#ff0040", clipPath: "inset(20% 0 40% 0)" }}
            aria-hidden
          >
            {text}
          </span>
          <span
            className="absolute left-0 top-0 z-20 animate-pulse"
            style={{ color: "#00f0ff", clipPath: "inset(60% 0 10% 0)" }}
            aria-hidden
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="mb-4 text-[10rem] font-bold leading-none text-accent-color sm:text-[12rem] md:text-[16rem]">
            <GlitchText text="404" />
          </h1>
        </motion.div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-accent-color/20"
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 300 - 150,
              opacity: 0,
            }}
            animate={{
              y: [null, -100 - Math.random() * 200],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut",
            }}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${30 + Math.random() * 40}%`,
            }}
          />
        ))}

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="mb-2 text-xl text-text-secondary sm:text-2xl">
            Lost in the digital void?
          </p>
          <p className="mb-8 text-sm text-text-secondary/60">
            The page you&apos;re looking for has drifted into the abyss.
          </p>
        </motion.div>

        {/* Animated scan line */}
        <motion.div
          className="mx-auto mb-8 h-px w-48 bg-gradient-to-r from-transparent via-accent-color/30 to-transparent"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/"
            className="group relative overflow-hidden rounded-full bg-accent-color px-8 py-3 text-sm font-semibold text-background transition-all hover:shadow-[0_0_30px_rgba(225,224,204,0.3)]"
          >
            <span className="relative z-10">Return Home</span>
            <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-accent-color/20 px-8 py-3 text-sm font-semibold text-accent-color transition-all hover:border-accent-color/40 hover:bg-accent-color/5"
          >
            Contact Support
          </Link>
        </motion.div>

        {/* Terminal-style blinking cursor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 font-mono text-xs text-accent-color/30"
        >
          <span>$ </span>
          <span className="animate-pulse">_</span>
          <span className="ml-2 opacity-50">error: page not found</span>
        </motion.div>
      </div>
    </div>
  );
}
