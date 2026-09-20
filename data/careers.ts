import { Globe, Zap, Users } from "lucide-react";
import type { JobPosition, CompanyPerk } from "@/types";

export const jobPositions: JobPosition[] = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-Time",
    salary: "$140k - $180k",
    description:
      "Lead the development of next-generation distributed web systems using React 19, Next.js 16, and high-performance server runtimes.",
    requirements: [
      "5+ years professional experience with React/Next.js and modern serverless platforms.",
      "Expert knowledge of DB optimizations (Postgres, Redis) and real-time streaming architectures.",
      "Passion for sleek user interactions, motion physics, and clean structural design.",
    ],
  },
  {
    title: "AI Reasoning Researcher",
    department: "Artificial Intelligence",
    location: "San Francisco, CA / Hybrid",
    type: "Full-Time",
    salary: "$180k - $240k",
    description:
      "Design and implement custom feedback loops, self-correction algorithms, and complex reasoning pipelines on top of LLMs.",
    requirements: [
      "Strong background in PyTorch, Python, LLM fine-tuning, and inference scaling.",
      "Deep understanding of reinforcement learning, prompt reasoning topologies, and multimodal models.",
      "Contributions to open-source AI projects or publications at NeurIPS/ICML is a big plus.",
    ],
  },
  {
    title: "Creative Systems Designer",
    department: "Design & UX",
    location: "London, UK / Remote",
    type: "Full-Time",
    salary: "$110k - $150k",
    description:
      "Craft premium digital experiences, high-fidelity UI systems, and customized animation components that push modern web boundaries.",
    requirements: [
      "Portfolio showcasing breathtaking visual design, customized vector systems, and interactive motion prototypes.",
      "Proficient in TailwindCSS, CSS variables, Framer Motion, and GSAP.",
      "Ability to translate complex user workflows into intuitive, micro-animated digital products.",
    ],
  },
];

export const companyPerks: CompanyPerk[] = [
  {
    title: "Remote-First Culture",
    description:
      "Work from wherever you are happiest. We support a completely distributed team across 12+ timezones.",
    icon: Globe,
    color: "purple",
  },
  {
    title: "Peak Infrastructure",
    description:
      "Top-tier hardware budgets, unlimited cloud & AI model inference compute credits, and any tooling you need.",
    icon: Zap,
    color: "indigo",
  },
  {
    title: "Collaborative Mastery",
    description:
      "Work alongside world-class engineers, Kaggle Grandmasters, and design visionaries on ambitious products.",
    icon: Users,
    color: "cyan",
  },
];
