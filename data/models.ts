import { Brain, Cpu, Layers } from "lucide-react";
import type { AIModel } from "@/types";

export const aiModels: AIModel[] = [
  {
    id: "neural-v1",
    name: "Autopilot Neural Router v1.2",
    tagline: "High-Frequency Task Dispatcher",
    description:
      "An ultra-low latency transformer router that accurately parses customer queries and resolves direct agent routing pathways, reducing infrastructure routing overhead by up to 40%.",
    parameters: "1.4 Billion Parameters",
    tokens: "Up to 32k context length",
    latency: "38ms inference speed",
    accuracy: "99.1% parsing precision",
    useCase: "Customer intent mapping & smart routing microservices.",
    specs: {
      Architecture: "Decoder-only MoE (Mixture of Experts)",
      Framework: "PyTorch & TensorRT",
      Dataset: "12M cleaned client support sessions",
    },
    icon: Brain,
    color: "from-indigo-500 to-cyan-500",
    gradient:
      "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)",
  },
  {
    id: "vision-v4",
    name: "Vortex Vision Engine v4.0",
    tagline: "Multimodal Visual Analysis & QA",
    description:
      "High-throughput vision model optimized for instant image labeling, spatial object detection, and multimodal pipeline quality control with sub-100ms response cycles.",
    parameters: "840 Million Parameters",
    tokens: "Multimodal / Image Embeddings",
    latency: "85ms processing speed",
    accuracy: "98.5% detection recall",
    useCase:
      "Enterprise QA audits, automated invoice labeling, and visual transcription.",
    specs: {
      Architecture: "ViT (Vision Transformer) + CNN Backbone",
      Framework: "JAX & OpenXLA",
      Dataset: "400M multi-category labeled image sets",
    },
    icon: Cpu,
    color: "from-purple-500 to-pink-500",
    gradient:
      "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
  },
  {
    id: "vector-v2",
    name: "Tactile Vector Optimizer v2.5",
    tagline: "Physics-Based Vector Rendering",
    description:
      "Our proprietary browser-side mathematical system engineered to render spring-physics vector animations, rotating cards, and fluid interactive containers smoothly.",
    parameters: "Web Assembly (Wasm) Engine",
    tokens: "Direct vector coordinates",
    latency: "0.2ms local render loop",
    accuracy: "60 FPS hardware accelerated",
    useCase:
      "Stunning web layouts, smooth hover animations, and advanced fluid dynamics.",
    specs: {
      Architecture: "Wasm + Canvas WebGL Pipeline",
      Framework: "Rust & AssemblyScript",
      Dataset: "100% Client-Side Physics Simulation",
    },
    icon: Layers,
    color: "from-emerald-500 to-teal-500",
    gradient:
      "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)",
  },
];
