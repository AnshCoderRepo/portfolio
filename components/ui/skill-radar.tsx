"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Skill {
  name: string;
  level: number; // 0-100
}

const skills: Skill[] = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 92 },
  { name: "Node.js", level: 88 },
  { name: "Cloud Architecture", level: 85 },
  { name: "AI / ML", level: 80 },
  { name: "Mobile Dev", level: 78 },
  { name: "DevOps", level: 82 },
  { name: "UI/UX Design", level: 75 },
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function SkillRadar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start: number | null = null;
      const duration = 1500;

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const p = Math.min(elapsed / duration, 1);
        // Ease out cubic
        setProgress(1 - Math.pow(1 - p, 3));
        if (p < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }
  }, [isInView]);

  const cx = 200;
  const cy = 200;
  const maxR = 160;
  const levels = 5;
  const angleStep = 360 / skills.length;

  // Generate grid rings
  const rings = Array.from({ length: levels }, (_, i) => {
    const r = (maxR / levels) * (i + 1);
    const points = skills
      .map((_, j) => {
        const { x, y } = polarToCartesian(cx, cy, r, j * angleStep);
        return `${x},${y}`;
      })
      .join(" ");
    return points;
  });

  // Generate axis lines
  const axes = skills.map((_, i) => {
    const end = polarToCartesian(cx, cy, maxR, i * angleStep);
    return { x1: cx, y1: cy, x2: end.x, y2: end.y };
  });

  // Generate data polygon
  const dataPoints = skills
    .map((skill, i) => {
      const r = (skill.level / 100) * maxR * progress;
      const { x, y } = polarToCartesian(cx, cy, r, i * angleStep);
      return `${x},${y}`;
    })
    .join(" ");

  // Generate data dots
  const dataDots = skills.map((skill, i) => {
    const r = (skill.level / 100) * maxR * progress;
    return polarToCartesian(cx, cy, r, i * angleStep);
  });

  // Generate labels
  const labels = skills.map((skill, i) => {
    const r = maxR + 28;
    const pos = polarToCartesian(cx, cy, r, i * angleStep);
    return { ...skill, ...pos };
  });

  return (
    <div ref={ref} className="relative mx-auto max-w-lg">
      <svg viewBox="0 0 400 400" className="w-full">
        {/* Grid rings */}
        {rings.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            className="stroke-foreground/[0.08]"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {axes.map((axis, i) => (
          <line
            key={i}
            x1={axis.x1}
            y1={axis.y1}
            x2={axis.x2}
            y2={axis.y2}
            className="stroke-foreground/[0.08]"
            strokeWidth="1"
          />
        ))}

        {/* Data polygon */}
        <polygon
          points={dataPoints}
          className="fill-accent-color/10 stroke-accent-color"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Data dots */}
        {dataDots.map((dot, i) => (
          <motion.circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r={4}
            className="fill-accent-color"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
          />
        ))}

        {/* Labels */}
        {labels.map((label, i) => (
          <text
            key={i}
            x={label.x}
            y={label.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground/70 text-[10px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {label.name}
          </text>
        ))}
      </svg>
    </div>
  );
}
