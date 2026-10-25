"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-foreground/20"
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialCarousel() {
  const [items, setItems] = useState(testimonials);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.length > 0) {
          setItems(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const count = items.length;

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (count > 0 ? (prev + 1) % count : 0));
  }, [count]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (count > 0 ? (prev - 1 + count) % count : 0));
  }, [count]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-3xl px-4">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="rounded-3xl border border-card-border bg-surface/50 p-8 backdrop-blur-sm sm:p-12"
          >
            {/* Quote icon */}
            <Quote className="mb-6 h-8 w-8 text-foreground/20" />

            {/* Content */}
            <p className="mb-8 text-lg leading-relaxed text-foreground/80 sm:text-xl">
              &ldquo;{(items[current] || testimonials[0]).content}&rdquo;
            </p>

            {/* Rating */}
            <div className="mb-6">
              <StarRating rating={(items[current] || testimonials[0]).rating} />
            </div>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-card-border bg-surface">
                <img
                  src={(items[current] || testimonials[0]).photo}
                  alt={`${(items[current] || testimonials[0]).name}, ${(items[current] || testimonials[0]).role}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-foreground">
                  {(items[current] || testimonials[0]).name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {(items[current] || testimonials[0]).role} at {(items[current] || testimonials[0]).company}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-card-border bg-surface/50 transition-colors hover:bg-surface"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`h-2 rounded-full transition-all ${
                i === current
                  ? "w-8 bg-accent-color"
                  : "w-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-card-border bg-surface/50 transition-colors hover:bg-surface"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </div>
    </div>
  );
}
