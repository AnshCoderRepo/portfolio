import { Server, Cpu, Layers, Database } from "lucide-react";
import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Nova Cloud Systems",
    subtitle: "High-Speed Server Architecture",
    description:
      "An enterprise-grade, microsecond-latency cloud router managing over 50,000 requests per second with built-in failover capabilities and intelligent load balancing.",
    category: "Cloud Infrastructure",
    tech: ["Go", "Kubernetes", "gRPC", "Redis", "AWS"],
    metrics: {
      speed: "0.4ms Latency",
      load: "50k req/s",
      uptime: "99.999%",
    },
    icon: Server,
    color: "from-blue-600 to-indigo-600",
    glow: "rgba(37, 99, 235, 0.15)",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format",
  },
  {
    title: "Vortex Intelligence",
    subtitle: "Multimodal AI Agent",
    description:
      "Advanced generative AI orchestrator featuring self-learning feedback loops, custom fine-tuning pipelines, and live voice/multimodal dataset ingestion.",
    category: "Artificial Intelligence",
    tech: ["Python", "PyTorch", "Next.js", "FastAPI", "OpenAI"],
    metrics: {
      accuracy: "99.2% Score",
      context: "128k Tokens",
      latency: "120ms",
    },
    icon: Cpu,
    color: "from-purple-600 to-pink-600",
    glow: "rgba(147, 51, 234, 0.15)",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&auto=format",
  },
  {
    title: "Horizon Engine",
    subtitle: "Next.js Rendering Pipeline",
    description:
      "A proprietary web renderer built specifically on top of Next.js 16 to leverage edge caching, streaming HTML sections, and optimized CSS-in-JS compilation.",
    category: "Web Development",
    tech: ["Next.js 16", "React 19", "TailwindCSS", "Vercel"],
    metrics: {
      score: "100/100 Lighthouse",
      fcp: "0.2s",
      size: "12kb JS Core",
    },
    icon: Layers,
    color: "from-emerald-600 to-teal-600",
    glow: "rgba(5, 150, 105, 0.15)",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format",
  },
  {
    title: "Titan Database Orchestrator",
    subtitle: "Real-Time Analytical Storage",
    description:
      "High-performance timeseries analytics engine designed for financial data ingestion, supporting sub-millisecond querying across billions of rows.",
    category: "Big Data & Storage",
    tech: ["Rust", "ClickHouse", "Kafka", "PostgreSQL"],
    metrics: {
      throughput: "2.4GB/sec",
      volume: "10B+ Rows",
      queryTime: "2ms Avg",
    },
    icon: Database,
    color: "from-amber-600 to-orange-600",
    glow: "rgba(217, 119, 6, 0.15)",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80&auto=format",
  },
];

export const projectHeroImages = projects.map((p) => ({
  src: p.image,
  alt: p.title,
}));
