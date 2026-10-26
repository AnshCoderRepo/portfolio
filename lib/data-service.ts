import fs from "fs";
import path from "path";
import { connectToDatabase } from "./mongodb";
import { ProjectModel, IProject } from "./models/Project";
import { TestimonialModel, ITestimonial } from "./models/Testimonial";
import { CareerModel, ICareer } from "./models/Career";
import { AIModelCollection, IAIModel } from "./models/AIModel";
import { InquiryModel, IInquiry } from "./models/Inquiry";
import { SiteSettingModel, ISiteSetting } from "./models/SiteSetting";

// Local JSON DB file location for resilient fallback
const DB_DIR = path.join(process.cwd(), "data", "db");
const DB_FILE = path.join(DB_DIR, "local-db.json");

interface LocalDatabase {
  projects: IProject[];
  testimonials: ITestimonial[];
  careers: ICareer[];
  models: IAIModel[];
  inquiries: IInquiry[];
  settings: ISiteSetting;
}

const initialSeedData: LocalDatabase = {
  projects: [
    {
      id: "proj-1",
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
      iconName: "Server",
      color: "from-blue-600 to-indigo-600",
      glow: "rgba(37, 99, 235, 0.15)",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format",
      featured: true,
    },
    {
      id: "proj-2",
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
      iconName: "Cpu",
      color: "from-purple-600 to-pink-600",
      glow: "rgba(147, 51, 234, 0.15)",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&auto=format",
      featured: true,
    },
    {
      id: "proj-3",
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
      iconName: "Layers",
      color: "from-emerald-600 to-teal-600",
      glow: "rgba(5, 150, 105, 0.15)",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format",
      featured: true,
    },
    {
      id: "proj-4",
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
      iconName: "Database",
      color: "from-amber-600 to-orange-600",
      glow: "rgba(217, 119, 6, 0.15)",
      image:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80&auto=format",
      featured: false,
    },
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Sarah Chen",
      role: "CTO",
      company: "TechFlow Inc",
      rating: 5,
      content:
        "NSSolutions transformed our legacy system into a modern, scalable platform. Their expertise in Next.js and cloud architecture is unmatched. Delivered 3 weeks ahead of schedule.",
      photo:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "test-2",
      name: "Marcus Rodriguez",
      role: "Founder",
      company: "DataVerse AI",
      rating: 5,
      content:
        "The data annotation pipeline they built processes 10x more data than our previous solution. Exceptional quality and attention to detail. Highly recommend their AI services.",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "test-3",
      name: "Emily Watson",
      role: "Product Manager",
      company: "CloudNine",
      rating: 5,
      content:
        "Working with NSSolutions was a game-changer. They understood our vision and delivered a mobile app that exceeded all expectations. Their communication was flawless throughout.",
      photo:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "test-4",
      name: "David Park",
      role: "CEO",
      company: "InnovateLabs",
      rating: 5,
      content:
        "From concept to deployment, NSSolutions handled everything with professionalism and skill. The custom web platform they built handles 100K+ daily users without breaking a sweat.",
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
  ],
  careers: [
    {
      id: "career-1",
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
      status: "active",
    },
    {
      id: "career-2",
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
      status: "active",
    },
    {
      id: "career-3",
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
      status: "active",
    },
  ],
  models: [
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
      iconName: "Brain",
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
      iconName: "Cpu",
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
      iconName: "Layers",
      color: "from-emerald-500 to-teal-500",
      gradient:
        "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)",
    },
  ],
  inquiries: [
    {
      id: "inq-1",
      name: "Alexandria Miller",
      email: "alex@fintechglobal.io",
      subject: "High-Frequency Dashboard Architecture",
      message:
        "We are looking to rebuild our trading analysis portal with real-time web socket streams and sub-millisecond chart rendering. Would love to book an engineering consult.",
      source: "contact_page",
      budget: "$25,000 - $50,000",
      timeline: "6 - 8 Weeks",
      status: "unread",
      createdAt: new Date(),
    },
    {
      id: "inq-2",
      name: "Liam Thorne",
      email: "liam@omnimodal.ai",
      subject: "AI Agent Orchestration Platform",
      message:
        "Need a bespoke multimodal LLM routing engine integrated with our internal database APIs. Saw your Vortex Intelligence work and wanted to discuss scope.",
      source: "project_estimator",
      budget: "$50,000+",
      timeline: "3 Months",
      status: "read",
      createdAt: new Date(Date.now() - 86400000 * 2),
    },
  ],
  settings: {
    name: "NSSolutions",
    authorName: "Ansh Coder",
    title: "NSSolutions | Premium Digital Product & Freelancing Solutions",
    description:
      "NSSolutions is an elite collective of freelancers converting real-world client visions into robust web systems, mobile applications, and high-performance server architectures.",
    url: "https://nssolutions.dev",
    email: "nssolution583@gmail.com",
    phone: "+91 7070410031",
    location: "San Francisco, CA",
    whatsappPhone: "917070410031",
    whatsappMessage: "Hi NSSolutions! I'd like to discuss a project.",
    calendlyUrl: "https://calendly.com/nssolutions",
  },
};

// Local JSON File Helpers
function readLocalDb(): LocalDatabase {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialSeedData, null, 2), "utf-8");
      return initialSeedData;
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading local-db.json:", err);
    return initialSeedData;
  }
}

function writeLocalDb(data: LocalDatabase): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing local-db.json:", err);
  }
}

/**
 * Normalizes document IDs for consistent frontend consumption
 */
function normalizeDoc<T extends object>(doc: T): T & { id: string } {
  const plain: any = (doc && typeof (doc as any).toObject === "function") 
    ? (doc as any).toObject() 
    : { ...doc };
  
  if (plain._id) {
    plain.id = plain._id.toString();
  } else if (!plain.id) {
    plain.id = `id-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  }
  return plain;
}

export const DataService = {
  /**
   * Retrieves current connection status and backend storage mode
   */
  async getStatus() {
    const status = await connectToDatabase();
    return {
      mode: status.mode,
      isConnected: status.isConnected,
      message: status.message,
      database: status.isConnected ? "MongoDB" : "Local Storage (MongoDB-Ready)",
    };
  },

  /**
   * Automatically seeds MongoDB if empty when connected
   */
  async autoSeedMongoDBIfEmpty() {
    const status = await connectToDatabase();
    if (!status.isConnected) return;

    try {
      const projectCount = await ProjectModel.countDocuments();
      if (projectCount === 0) {
        await ProjectModel.insertMany(initialSeedData.projects);
        await TestimonialModel.insertMany(initialSeedData.testimonials);
        await CareerModel.insertMany(initialSeedData.careers);
        await AIModelCollection.insertMany(initialSeedData.models);
        await InquiryModel.insertMany(initialSeedData.inquiries);
        await SiteSettingModel.create(initialSeedData.settings);
        console.log("Successfully seeded MongoDB with initial NSSolutions data.");
      }
    } catch (err) {
      console.error("Auto-seed error:", err);
    }
  },

  // ----------------------------------------------------
  // PROJECTS CRUD
  // ----------------------------------------------------
  async getProjects(): Promise<IProject[]> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      await this.autoSeedMongoDBIfEmpty();
      const docs = await ProjectModel.find({}).sort({ createdAt: -1 }).lean();
      return docs.map(normalizeDoc);
    }
    const db = readLocalDb();
    return db.projects.map(normalizeDoc);
  },

  async createProject(data: Partial<IProject>): Promise<IProject> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      const doc = await ProjectModel.create(data);
      return normalizeDoc(doc);
    }
    const db = readLocalDb();
    const newProject: IProject = {
      id: `proj-${Date.now()}`,
      title: data.title || "Untitled Project",
      subtitle: data.subtitle || "New Project",
      description: data.description || "",
      category: data.category || "Web Development",
      tech: data.tech || [],
      metrics: data.metrics || {},
      iconName: data.iconName || "Layers",
      color: data.color || "from-blue-600 to-indigo-600",
      glow: data.glow || "rgba(37, 99, 235, 0.15)",
      image: data.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      featured: data.featured ?? true,
      createdAt: new Date(),
    };
    db.projects.unshift(newProject);
    writeLocalDb(db);
    return newProject;
  },

  async updateProject(id: string, data: Partial<IProject>): Promise<IProject | null> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      const doc = await ProjectModel.findByIdAndUpdate(id, data, { new: true }).lean();
      if (doc) return normalizeDoc(doc);
    }
    const db = readLocalDb();
    const idx = db.projects.findIndex((p) => p.id === id || (p as any)._id === id);
    if (idx !== -1) {
      db.projects[idx] = { ...db.projects[idx], ...data, updatedAt: new Date() };
      writeLocalDb(db);
      return db.projects[idx];
    }
    return null;
  },

  async deleteProject(id: string): Promise<boolean> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      const res = await ProjectModel.findByIdAndDelete(id);
      if (res) return true;
    }
    const db = readLocalDb();
    const before = db.projects.length;
    db.projects = db.projects.filter((p) => p.id !== id && (p as any)._id !== id);
    writeLocalDb(db);
    return db.projects.length < before;
  },

  // ----------------------------------------------------
  // TESTIMONIALS CRUD
  // ----------------------------------------------------
  async getTestimonials(): Promise<ITestimonial[]> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      await this.autoSeedMongoDBIfEmpty();
      const docs = await TestimonialModel.find({}).sort({ createdAt: -1 }).lean();
      return docs.map(normalizeDoc);
    }
    const db = readLocalDb();
    return db.testimonials.map(normalizeDoc);
  },

  async createTestimonial(data: Partial<ITestimonial>): Promise<ITestimonial> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      const doc = await TestimonialModel.create(data);
      return normalizeDoc(doc);
    }
    const db = readLocalDb();
    const newTestimonial: ITestimonial = {
      id: `test-${Date.now()}`,
      name: data.name || "Anonymous Client",
      role: data.role || "Product Lead",
      company: data.company || "Enterprise",
      rating: Number(data.rating) || 5,
      content: data.content || "",
      photo: data.photo || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face",
      createdAt: new Date(),
    };
    db.testimonials.unshift(newTestimonial);
    writeLocalDb(db);
    return newTestimonial;
  },

  async updateTestimonial(id: string, data: Partial<ITestimonial>): Promise<ITestimonial | null> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      const doc = await TestimonialModel.findByIdAndUpdate(id, data, { new: true }).lean();
      if (doc) return normalizeDoc(doc);
    }
    const db = readLocalDb();
    const idx = db.testimonials.findIndex((t) => t.id === id || (t as any)._id === id);
    if (idx !== -1) {
      db.testimonials[idx] = { ...db.testimonials[idx], ...data, updatedAt: new Date() };
      writeLocalDb(db);
      return db.testimonials[idx];
    }
    return null;
  },

  async deleteTestimonial(id: string): Promise<boolean> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      const res = await TestimonialModel.findByIdAndDelete(id);
      if (res) return true;
    }
    const db = readLocalDb();
    const before = db.testimonials.length;
    db.testimonials = db.testimonials.filter((t) => t.id !== id && (t as any)._id !== id);
    writeLocalDb(db);
    return db.testimonials.length < before;
  },

  // ----------------------------------------------------
  // CAREERS / JOB OPENINGS CRUD
  // ----------------------------------------------------
  async getCareers(): Promise<ICareer[]> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      await this.autoSeedMongoDBIfEmpty();
      const docs = await CareerModel.find({}).sort({ createdAt: -1 }).lean();
      return docs.map(normalizeDoc);
    }
    const db = readLocalDb();
    return db.careers.map(normalizeDoc);
  },

  async createCareer(data: Partial<ICareer>): Promise<ICareer> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      const doc = await CareerModel.create(data);
      return normalizeDoc(doc);
    }
    const db = readLocalDb();
    const newCareer: ICareer = {
      id: `career-${Date.now()}`,
      title: data.title || "Open Position",
      department: data.department || "Engineering",
      location: data.location || "Remote",
      type: data.type || "Full-Time",
      salary: data.salary || "$120k - $160k",
      description: data.description || "",
      requirements: data.requirements || [],
      status: data.status || "active",
      createdAt: new Date(),
    };
    db.careers.unshift(newCareer);
    writeLocalDb(db);
    return newCareer;
  },

  async updateCareer(id: string, data: Partial<ICareer>): Promise<ICareer | null> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      const doc = await CareerModel.findByIdAndUpdate(id, data, { new: true }).lean();
      if (doc) return normalizeDoc(doc);
    }
    const db = readLocalDb();
    const idx = db.careers.findIndex((c) => c.id === id || (c as any)._id === id);
    if (idx !== -1) {
      db.careers[idx] = { ...db.careers[idx], ...data, updatedAt: new Date() };
      writeLocalDb(db);
      return db.careers[idx];
    }
    return null;
  },

  async deleteCareer(id: string): Promise<boolean> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      const res = await CareerModel.findByIdAndDelete(id);
      if (res) return true;
    }
    const db = readLocalDb();
    const before = db.careers.length;
    db.careers = db.careers.filter((c) => c.id !== id && (c as any)._id !== id);
    writeLocalDb(db);
    return db.careers.length < before;
  },

  // ----------------------------------------------------
  // AI MODELS CRUD
  // ----------------------------------------------------
  async getAIModels(): Promise<IAIModel[]> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      await this.autoSeedMongoDBIfEmpty();
      const docs = await AIModelCollection.find({}).sort({ createdAt: -1 }).lean();
      return docs.map(normalizeDoc);
    }
    const db = readLocalDb();
    return db.models.map(normalizeDoc);
  },

  async createAIModel(data: Partial<IAIModel>): Promise<IAIModel> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      const doc = await AIModelCollection.create(data);
      return normalizeDoc(doc);
    }
    const db = readLocalDb();
    const newModel: IAIModel = {
      id: data.id || `model-${Date.now()}`,
      name: data.name || "Custom Neural Model",
      tagline: data.tagline || "Specialized Task Architecture",
      description: data.description || "",
      parameters: data.parameters || "1 Billion Parameters",
      tokens: data.tokens || "32k Context Length",
      latency: data.latency || "45ms",
      accuracy: data.accuracy || "99.0%",
      useCase: data.useCase || "Enterprise task processing",
      specs: data.specs || {},
      iconName: data.iconName || "Brain",
      color: data.color || "from-indigo-500 to-cyan-500",
      gradient: data.gradient || "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)",
      createdAt: new Date(),
    };
    db.models.unshift(newModel);
    writeLocalDb(db);
    return newModel;
  },

  async updateAIModel(id: string, data: Partial<IAIModel>): Promise<IAIModel | null> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      const doc = await AIModelCollection.findOneAndUpdate(
        { $or: [{ _id: id }, { id }] },
        data,
        { new: true }
      ).lean();
      if (doc) return normalizeDoc(doc);
    }
    const db = readLocalDb();
    const idx = db.models.findIndex((m) => m.id === id || (m as any)._id === id);
    if (idx !== -1) {
      db.models[idx] = { ...db.models[idx], ...data, updatedAt: new Date() };
      writeLocalDb(db);
      return db.models[idx];
    }
    return null;
  },

  async deleteAIModel(id: string): Promise<boolean> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      const res = await AIModelCollection.findOneAndDelete({ $or: [{ _id: id }, { id }] });
      if (res) return true;
    }
    const db = readLocalDb();
    const before = db.models.length;
    db.models = db.models.filter((m) => m.id !== id && (m as any)._id !== id);
    writeLocalDb(db);
    return db.models.length < before;
  },

  // ----------------------------------------------------
  // INQUIRIES & LEADS CRUD
  // ----------------------------------------------------
  async getInquiries(): Promise<IInquiry[]> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      await this.autoSeedMongoDBIfEmpty();
      const docs = await InquiryModel.find({}).sort({ createdAt: -1 }).lean();
      return docs.map(normalizeDoc);
    }
    const db = readLocalDb();
    return db.inquiries.map(normalizeDoc);
  },

  async createInquiry(data: Partial<IInquiry>): Promise<IInquiry> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      const doc = await InquiryModel.create(data);
      return normalizeDoc(doc);
    }
    const db = readLocalDb();
    const newInquiry: IInquiry = {
      id: `inq-${Date.now()}`,
      name: data.name || "Anonymous Prospect",
      email: data.email || "",
      subject: data.subject || "Project Consultation",
      message: data.message || "",
      source: data.source || "contact_page",
      budget: data.budget,
      timeline: data.timeline,
      status: "unread",
      createdAt: new Date(),
    };
    db.inquiries.unshift(newInquiry);
    writeLocalDb(db);
    return newInquiry;
  },

  async updateInquiryStatus(id: string, status: "unread" | "read" | "replied"): Promise<IInquiry | null> {
    const dbStatus = await connectToDatabase();
    if (dbStatus.isConnected) {
      const doc = await InquiryModel.findByIdAndUpdate(id, { status }, { new: true }).lean();
      if (doc) return normalizeDoc(doc);
    }
    const db = readLocalDb();
    const idx = db.inquiries.findIndex((i) => i.id === id || (i as any)._id === id);
    if (idx !== -1) {
      db.inquiries[idx].status = status;
      db.inquiries[idx].updatedAt = new Date();
      writeLocalDb(db);
      return db.inquiries[idx];
    }
    return null;
  },

  async deleteInquiry(id: string): Promise<boolean> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      const res = await InquiryModel.findByIdAndDelete(id);
      if (res) return true;
    }
    const db = readLocalDb();
    const before = db.inquiries.length;
    db.inquiries = db.inquiries.filter((i) => i.id !== id && (i as any)._id !== id);
    writeLocalDb(db);
    return db.inquiries.length < before;
  },

  // ----------------------------------------------------
  // SITE SETTINGS
  // ----------------------------------------------------
  async getSettings(): Promise<ISiteSetting> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      await this.autoSeedMongoDBIfEmpty();
      const doc = await SiteSettingModel.findOne({}).lean();
      if (doc) return normalizeDoc(doc);
    }
    const db = readLocalDb();
    return db.settings;
  },

  async updateSettings(data: Partial<ISiteSetting>): Promise<ISiteSetting> {
    const status = await connectToDatabase();
    if (status.isConnected) {
      const doc = await SiteSettingModel.findOneAndUpdate(
        {},
        { $set: data },
        { new: true, upsert: true }
      ).lean();
      return normalizeDoc(doc);
    }
    const db = readLocalDb();
    db.settings = { ...db.settings, ...data, updatedAt: new Date() };
    writeLocalDb(db);
    return db.settings;
  },
};
