"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  photo: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Inc",
    rating: 5,
    content:
      "ASSolutions transformed our legacy system into a modern, scalable platform. Their expertise in Next.js and cloud architecture is unmatched. Delivered 3 weeks ahead of schedule.",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder",
    company: "DataVerse AI",
    rating: 5,
    content:
      "The data annotation pipeline they built processes 10x more data than our previous solution. Exceptional quality and attention to detail. Highly recommend their AI services.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Emily Watson",
    role: "Product Manager",
    company: "CloudNine",
    rating: 5,
    content:
      "Working with ASSolutions was a game-changer. They understood our vision and delivered a mobile app that exceeded all expectations. Their communication was flawless throughout.",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "David Park",
    role: "CEO",
    company: "InnovateLabs",
    rating: 5,
    content:
      "From concept to deployment, ASSolutions handled everything with professionalism and skill. The custom web platform they built handles 100K+ daily users without breaking a sweat.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
];

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
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

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
              &ldquo;{testimonials[current].content}&rdquo;
            </p>

            {/* Rating */}
            <div className="mb-6">
              <StarRating rating={testimonials[current].rating} />
            </div>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-card-border bg-surface">
                <img
                  src={testimonials[current].photo}
                  alt={`${testimonials[current].name}, ${testimonials[current].role} at ${testimonials[current].company}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-foreground">
                  {testimonials[current].name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonials[current].role} at {testimonials[current].company}
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
