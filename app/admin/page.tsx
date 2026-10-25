"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Layers,
  Sparkles,
  MessageSquare,
  Briefcase,
  Brain,
  Inbox,
  Settings,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  LogOut,
  Database,
  CheckCircle2,
  AlertCircle,
  X,
  RefreshCw,
  Search,
  Check,
  Star,
  Clock,
  ArrowUpRight,
} from "lucide-react";

type TabType = "overview" | "projects" | "testimonials" | "careers" | "models" | "inquiries" | "settings";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tech: string[];
  metrics: Record<string, string>;
  image: string;
  color?: string;
  glow?: string;
  featured?: boolean;
}

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  photo: string;
}

interface CareerItem {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  status: "active" | "closed";
}

interface AIModelItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  parameters: string;
  tokens: string;
  latency: string;
  accuracy: string;
  useCase: string;
  specs: Record<string, string>;
  color: string;
}

interface InquiryItem {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  source: string;
  budget?: string;
  timeline?: string;
  status: "unread" | "read" | "replied";
  createdAt?: string;
}

interface SiteSettings {
  name: string;
  authorName: string;
  title: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  location: string;
  whatsappPhone: string;
  whatsappMessage: string;
  calendlyUrl: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  // State
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState<{
    mode: string;
    isConnected: boolean;
    message: string;
    database: string;
  } | null>(null);

  // Entities state
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [models, setModels] = useState<AIModelItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  // Notifications
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modals state
  const [projectModal, setProjectModal] = useState<{ open: boolean; item?: ProjectItem }>({ open: false });
  const [testimonialModal, setTestimonialModal] = useState<{ open: boolean; item?: TestimonialItem }>({ open: false });
  const [careerModal, setCareerModal] = useState<{ open: boolean; item?: CareerItem }>({ open: false });
  const [modelModal, setModelModal] = useState<{ open: boolean; item?: AIModelItem }>({ open: false });
  const [inquiryModal, setInquiryModal] = useState<{ open: boolean; item?: InquiryItem }>({ open: false });
  const [dbInfoModal, setDbInfoModal] = useState(false);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Check auth & load data
  const loadAllData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Check auth status
      const authRes = await fetch("/api/admin/auth/me");
      const authData = await authRes.json();
      if (!authData.authenticated) {
        router.push("/admin/login");
        return;
      }

      // 2. Fetch db status & counts
      const statusRes = await fetch("/api/admin/status");
      if (statusRes.ok) {
        const sData = await statusRes.json();
        setDbStatus(sData.status);
      }

      // 3. Parallel fetch all collections
      const [pRes, tRes, cRes, mRes, iRes, setRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/testimonials"),
        fetch("/api/careers"),
        fetch("/api/models"),
        fetch("/api/inquiries"),
        fetch("/api/settings"),
      ]);

      if (pRes.ok) setProjects((await pRes.json()).data || []);
      if (tRes.ok) setTestimonials((await tRes.json()).data || []);
      if (cRes.ok) setCareers((await cRes.json()).data || []);
      if (mRes.ok) setModels((await mRes.json()).data || []);
      if (iRes.ok) setInquiries((await iRes.json()).data || []);
      if (setRes.ok) setSettings((await setRes.json()).data || null);
    } catch (err) {
      console.error("Dashboard data load error:", err);
      showToast("Error synchronizing dashboard data", "error");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  // ------------------------------------------------------------------
  // CRUD ACTIONS
  // ------------------------------------------------------------------

  // Projects
  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const id = projectModal.item?.id;

    const body = {
      title: form.get("title") as string,
      subtitle: form.get("subtitle") as string,
      category: form.get("category") as string,
      description: form.get("description") as string,
      image: form.get("image") as string,
      tech: (form.get("tech") as string).split(",").map((t) => t.trim()).filter(Boolean),
      metrics: {
        speed: (form.get("metric_speed") as string) || "0.4ms Latency",
        load: (form.get("metric_load") as string) || "50k req/s",
        uptime: (form.get("metric_uptime") as string) || "99.99%",
      },
      featured: form.get("featured") === "on",
    };

    const res = await fetch(id ? `/api/projects/${id}` : "/api/projects", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      showToast(id ? "Project updated successfully!" : "New project published!");
      setProjectModal({ open: false });
      loadAllData();
    } else {
      showToast("Failed to save project", "error");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Project deleted");
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Testimonials
  const handleSaveTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const id = testimonialModal.item?.id;

    const body = {
      name: form.get("name") as string,
      role: form.get("role") as string,
      company: form.get("company") as string,
      rating: Number(form.get("rating") || 5),
      photo: form.get("photo") as string,
      content: form.get("content") as string,
    };

    const res = await fetch(id ? `/api/testimonials/${id}` : "/api/testimonials", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      showToast(id ? "Testimonial updated!" : "Testimonial added!");
      setTestimonialModal({ open: false });
      loadAllData();
    } else {
      showToast("Failed to save testimonial", "error");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Testimonial removed");
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // Careers
  const handleSaveCareer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const id = careerModal.item?.id;

    const body = {
      title: form.get("title") as string,
      department: form.get("department") as string,
      location: form.get("location") as string,
      type: form.get("type") as string,
      salary: form.get("salary") as string,
      description: form.get("description") as string,
      requirements: (form.get("requirements") as string).split("\n").map((r) => r.trim()).filter(Boolean),
      status: (form.get("status") as "active" | "closed") || "active",
    };

    const res = await fetch(id ? `/api/careers/${id}` : "/api/careers", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      showToast(id ? "Opening updated!" : "Career opening published!");
      setCareerModal({ open: false });
      loadAllData();
    } else {
      showToast("Failed to save position", "error");
    }
  };

  const handleDeleteCareer = async (id: string) => {
    if (!confirm("Delete this job opening?")) return;
    const res = await fetch(`/api/careers/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Opening deleted");
      setCareers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // AI Models
  const handleSaveModel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const id = modelModal.item?.id;

    const body = {
      name: form.get("name") as string,
      tagline: form.get("tagline") as string,
      description: form.get("description") as string,
      parameters: form.get("parameters") as string,
      tokens: form.get("tokens") as string,
      latency: form.get("latency") as string,
      accuracy: form.get("accuracy") as string,
      useCase: form.get("useCase") as string,
      specs: {
        Architecture: (form.get("spec_arch") as string) || "Decoder-only MoE",
        Framework: (form.get("spec_framework") as string) || "PyTorch / JAX",
        Dataset: (form.get("spec_dataset") as string) || "Client production sessions",
      },
    };

    const res = await fetch(id ? `/api/models/${id}` : "/api/models", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      showToast(id ? "AI Model updated!" : "AI Model registered!");
      setModelModal({ open: false });
      loadAllData();
    } else {
      showToast("Failed to save AI model", "error");
    }
  };

  const handleDeleteModel = async (id: string) => {
    if (!confirm("Delete this AI model specification?")) return;
    const res = await fetch(`/api/models/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("AI Model removed");
      setModels((prev) => prev.filter((m) => m.id !== id));
    }
  };

  // Inquiries
  const handleUpdateInquiryStatus = async (id: string, status: "unread" | "read" | "replied") => {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      showToast(`Inquiry marked as ${status}`);
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status } : i))
      );
      if (inquiryModal.item?.id === id) {
        setInquiryModal((prev) => ({
          ...prev,
          item: prev.item ? { ...prev.item, status } : undefined,
        }));
      }
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Delete this inquiry record?")) return;
    const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Inquiry deleted");
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      setInquiryModal({ open: false });
    }
  };

  // Settings
  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const body: Partial<SiteSettings> = {
      name: form.get("name") as string,
      authorName: form.get("authorName") as string,
      title: form.get("title") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      location: form.get("location") as string,
      whatsappPhone: form.get("whatsappPhone") as string,
      whatsappMessage: form.get("whatsappMessage") as string,
      calendlyUrl: form.get("calendlyUrl") as string,
    };

    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();
      setSettings(data.data);
      showToast("Site settings updated across platform!");
    } else {
      showToast("Failed to save settings", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#030611] text-neutral-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-xl border text-xs font-medium animate-in fade-in slide-in-from-top-3 ${
            toastMessage.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-200"
              : "bg-rose-950/90 border-rose-500/40 text-rose-200"
          }`}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-black font-black text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            NS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                NSSolutions
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                Engine Admin
              </span>
            </div>
          </div>
        </div>

        {/* Database Status Indicator & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setDbInfoModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 transition text-xs font-mono"
            title="Click to view Database connection details"
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  dbStatus?.isConnected ? "bg-emerald-400" : "bg-cyan-400"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  dbStatus?.isConnected ? "bg-emerald-500" : "bg-cyan-400"
                }`}
              />
            </span>
            <span className="hidden md:inline text-neutral-300">
              {dbStatus?.isConnected ? "MongoDB Atlas" : "Local Storage (MongoDB-Ready)"}
            </span>
            <Database className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-800 bg-neutral-900/40 text-neutral-300 hover:text-white hover:bg-neutral-800/60 text-xs transition"
          >
            <span>Live Website</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-950/20 text-xs transition flex items-center gap-1.5 cursor-pointer"
            title="Logout from Admin Panel"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-60 flex-shrink-0">
          <nav className="flex md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: "overview", label: "Overview", icon: Sparkles },
              { id: "projects", label: "Projects", icon: Layers, count: projects.length },
              { id: "testimonials", label: "Testimonials", icon: MessageSquare, count: testimonials.length },
              { id: "careers", label: "Careers", icon: Briefcase, count: careers.length },
              { id: "models", label: "AI Models", icon: Brain, count: models.length },
              {
                id: "inquiries",
                label: "Inquiries",
                icon: Inbox,
                count: inquiries.filter((i) => i.status === "unread").length,
                badgeColor: "bg-rose-500",
              },
              { id: "settings", label: "Site Settings", icon: Settings },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <TabIcon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-neutral-500"}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span
                      className={`ml-2 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                        tab.badgeColor
                          ? `${tab.badgeColor} text-white font-bold`
                          : isActive
                          ? "bg-cyan-500/20 text-cyan-300"
                          : "bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Dynamic Content Panel */}
        <main className="flex-1 min-w-0">
          {loading ? (
            <div className="h-72 rounded-2xl border border-neutral-800/80 bg-neutral-900/30 flex items-center justify-center">
              <div className="flex items-center gap-3 text-neutral-400 text-xs font-mono">
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Loading NSSolutions core engine...</span>
              </div>
            </div>
          ) : (
            <>
              {/* ---------------- 1. OVERVIEW ---------------- */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/80">
                      <div className="text-xs text-neutral-400 mb-1 flex items-center justify-between">
                        <span>Projects</span>
                        <Layers className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="text-2xl font-bold text-white font-mono">{projects.length}</div>
                      <div className="text-[11px] text-neutral-500 mt-1">Live in portfolio showcase</div>
                    </div>

                    <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/80">
                      <div className="text-xs text-neutral-400 mb-1 flex items-center justify-between">
                        <span>Client Reviews</span>
                        <MessageSquare className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="text-2xl font-bold text-white font-mono">{testimonials.length}</div>
                      <div className="text-[11px] text-neutral-500 mt-1">Verified endorsements</div>
                    </div>

                    <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/80">
                      <div className="text-xs text-neutral-400 mb-1 flex items-center justify-between">
                        <span>Job Openings</span>
                        <Briefcase className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="text-2xl font-bold text-white font-mono">
                        {careers.filter((c) => c.status === "active").length}
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-1">Active talent recruitment</div>
                    </div>

                    <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/80">
                      <div className="text-xs text-neutral-400 mb-1 flex items-center justify-between">
                        <span>Unread Leads</span>
                        <Inbox className="w-4 h-4 text-rose-400" />
                      </div>
                      <div className="text-2xl font-bold text-white font-mono">
                        {inquiries.filter((i) => i.status === "unread").length}
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-1">From contact & estimator</div>
                    </div>
                  </div>

                  {/* Database Engine Banner */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-neutral-900/80 to-neutral-950/80 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">Backend Storage Architecture</h3>
                        <p className="text-xs text-neutral-400">
                          Mode:{" "}
                          <span className="text-cyan-300 font-mono">
                            {dbStatus?.isConnected ? "MongoDB Atlas (Connected)" : "Local Storage (MongoDB-Ready)"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setDbInfoModal(true)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition cursor-pointer"
                    >
                      Configure MongoDB URI
                    </button>
                  </div>

                  {/* Recent Inquiries Quick Preview */}
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">Latest Prospect Inquiries</h3>
                      <button
                        onClick={() => setActiveTab("inquiries")}
                        className="text-xs text-cyan-400 hover:underline"
                      >
                        View all ({inquiries.length}) →
                      </button>
                    </div>

                    {inquiries.length === 0 ? (
                      <p className="text-xs text-neutral-500 py-6 text-center">No inquiries received yet.</p>
                    ) : (
                      <div className="divide-y divide-neutral-800/80">
                        {inquiries.slice(0, 3).map((item) => (
                          <div
                            key={item.id}
                            onClick={() => setInquiryModal({ open: true, item })}
                            className="py-3.5 flex items-center justify-between cursor-pointer hover:bg-neutral-900/40 px-2 rounded-xl transition"
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-white">{item.name}</span>
                                <span className="text-[11px] text-neutral-400">({item.email})</span>
                              </div>
                              <p className="text-xs text-neutral-400 truncate max-w-md">{item.message}</p>
                            </div>
                            <span
                              className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full ${
                                item.status === "unread"
                                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold"
                                  : "bg-neutral-800 text-neutral-400"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ---------------- 2. PROJECTS ---------------- */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">Projects Management</h2>
                      <p className="text-xs text-neutral-400">Manage case studies and live portfolio systems</p>
                    </div>
                    <button
                      onClick={() => setProjectModal({ open: true })}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-400 text-black hover:bg-cyan-300 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  <div className="grid gap-4">
                    {projects.map((p) => (
                      <div
                        key={p.id}
                        className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-16 h-16 rounded-xl object-cover border border-neutral-800 flex-shrink-0"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-bold text-sm text-white">{p.title}</h3>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                                {p.category}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-400 max-w-xl line-clamp-2">{p.description}</p>
                            <div className="flex items-center gap-1.5 flex-wrap pt-1">
                              {p.tech?.map((t) => (
                                <span
                                  key={t}
                                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => setProjectModal({ open: true, item: p })}
                            className="p-2 rounded-xl border border-neutral-800 text-neutral-300 hover:text-cyan-400 hover:border-cyan-500/30 transition cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(p.id)}
                            className="p-2 rounded-xl border border-neutral-800 text-neutral-400 hover:text-rose-400 hover:border-rose-500/30 transition cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------- 3. TESTIMONIALS ---------------- */}
              {activeTab === "testimonials" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">Client Testimonials</h2>
                      <p className="text-xs text-neutral-400">Manage client endorsements and star reviews</p>
                    </div>
                    <button
                      onClick={() => setTestimonialModal({ open: true })}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-400 text-black hover:bg-cyan-300 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Testimonial</span>
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {testimonials.map((t) => (
                      <div
                        key={t.id}
                        className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img
                                src={t.photo}
                                alt={t.name}
                                className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                              />
                              <div>
                                <h4 className="font-bold text-xs text-white">{t.name}</h4>
                                <p className="text-[11px] text-neutral-400">
                                  {t.role} • {t.company}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                              {Array.from({ length: t.rating }).map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-neutral-300 italic leading-relaxed">
                            &ldquo;{t.content}&rdquo;
                          </p>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800/60">
                          <button
                            onClick={() => setTestimonialModal({ open: true, item: t })}
                            className="p-1.5 rounded-lg border border-neutral-800 text-neutral-400 hover:text-cyan-400 transition"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(t.id)}
                            className="p-1.5 rounded-lg border border-neutral-800 text-neutral-400 hover:text-rose-400 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------- 4. CAREERS ---------------- */}
              {activeTab === "careers" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">Career Opportunities</h2>
                      <p className="text-xs text-neutral-400">Publish or close freelance & full-time roles</p>
                    </div>
                    <button
                      onClick={() => setCareerModal({ open: true })}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-400 text-black hover:bg-cyan-300 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Post Job Opening</span>
                    </button>
                  </div>

                  <div className="grid gap-4">
                    {careers.map((c) => (
                      <div
                        key={c.id}
                        className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-sm text-white">{c.title}</h3>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">
                              {c.department}
                            </span>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                                c.status === "active"
                                  ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
                                  : "bg-neutral-800 text-neutral-400"
                              }`}
                            >
                              {c.status}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400">
                            {c.location} • {c.type} • <span className="text-cyan-400 font-mono">{c.salary}</span>
                          </p>
                          <p className="text-xs text-neutral-300 max-w-xl">{c.description}</p>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => setCareerModal({ open: true, item: c })}
                            className="p-2 rounded-xl border border-neutral-800 text-neutral-300 hover:text-cyan-400 transition"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCareer(c.id)}
                            className="p-2 rounded-xl border border-neutral-800 text-neutral-400 hover:text-rose-400 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------- 5. AI MODELS ---------------- */}
              {activeTab === "models" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">AI Neural Models</h2>
                      <p className="text-xs text-neutral-400">
                        Architectures and specifications featured on /models page
                      </p>
                    </div>
                    <button
                      onClick={() => setModelModal({ open: true })}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-400 text-black hover:bg-cyan-300 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Register Model</span>
                    </button>
                  </div>

                  <div className="grid gap-4">
                    {models.map((m) => (
                      <div
                        key={m.id}
                        className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <h3 className="font-bold text-sm text-white">{m.name}</h3>
                          <p className="text-xs text-cyan-400 font-medium">{m.tagline}</p>
                          <p className="text-xs text-neutral-400 max-w-xl">{m.description}</p>
                          <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-neutral-400 flex-wrap">
                            <span>Scale: {m.parameters}</span>
                            <span>•</span>
                            <span className="text-emerald-400">Latency: {m.latency}</span>
                            <span>•</span>
                            <span className="text-purple-400">Accuracy: {m.accuracy}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => setModelModal({ open: true, item: m })}
                            className="p-2 rounded-xl border border-neutral-800 text-neutral-300 hover:text-cyan-400 transition"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteModel(m.id)}
                            className="p-2 rounded-xl border border-neutral-800 text-neutral-400 hover:text-rose-400 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------- 6. INQUIRIES & LEADS ---------------- */}
              {activeTab === "inquiries" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">Client Inquiries & Leads</h2>
                      <p className="text-xs text-neutral-400">
                        Messages sent via /contact form and interactive project estimator
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {inquiries.length === 0 ? (
                      <div className="p-12 text-center border border-neutral-800 rounded-2xl bg-neutral-900/30 text-neutral-500 text-xs">
                        Inbox is empty. When clients submit messages on your site, they will appear here.
                      </div>
                    ) : (
                      inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className={`p-5 rounded-2xl border transition ${
                            inq.status === "unread"
                              ? "bg-neutral-900/90 border-cyan-500/40 shadow-lg shadow-cyan-500/5"
                              : "bg-neutral-900/40 border-neutral-800"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-white">{inq.name}</span>
                                <span className="text-xs text-neutral-400">({inq.email})</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                                  {inq.source}
                                </span>
                              </div>
                              {inq.subject && (
                                <p className="text-xs text-cyan-300 font-medium mt-0.5">{inq.subject}</p>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={inq.status}
                                onChange={(e) =>
                                  handleUpdateInquiryStatus(
                                    inq.id,
                                    e.target.value as "unread" | "read" | "replied"
                                  )
                                }
                                className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-700 text-xs text-neutral-200 focus:outline-none focus:border-cyan-400"
                              >
                                <option value="unread">Unread</option>
                                <option value="read">Read</option>
                                <option value="replied">Replied</option>
                              </select>

                              <button
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="p-1.5 rounded-lg border border-neutral-800 text-neutral-400 hover:text-rose-400 transition"
                                title="Delete inquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed">
                            {inq.message}
                          </div>

                          {(inq.budget || inq.timeline) && (
                            <div className="flex items-center gap-4 mt-2 text-[11px] font-mono text-neutral-400">
                              {inq.budget && <span>Budget: {inq.budget}</span>}
                              {inq.timeline && <span>Timeline: {inq.timeline}</span>}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* ---------------- 7. SETTINGS ---------------- */}
              {activeTab === "settings" && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h2 className="text-xl font-bold text-white">Platform Configuration</h2>
                    <p className="text-xs text-neutral-400">
                      Update contact numbers, email, WhatsApp greeting, and brand details
                    </p>
                  </div>

                  {settings && (
                    <form
                      onSubmit={handleSaveSettings}
                      className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4 text-xs font-sans"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-neutral-300 font-medium">Brand Name</label>
                          <input
                            name="name"
                            defaultValue={settings.name}
                            className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-neutral-300 font-medium">Author Name</label>
                          <input
                            name="authorName"
                            defaultValue={settings.authorName}
                            className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-neutral-300 font-medium">Site SEO Title</label>
                        <input
                          name="title"
                          defaultValue={settings.title}
                          className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-neutral-300 font-medium">Public Contact Email</label>
                          <input
                            name="email"
                            defaultValue={settings.email}
                            className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-neutral-300 font-medium">Contact Phone</label>
                          <input
                            name="phone"
                            defaultValue={settings.phone}
                            className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-neutral-300 font-medium">WhatsApp Phone (no +)</label>
                          <input
                            name="whatsappPhone"
                            defaultValue={settings.whatsappPhone}
                            className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-neutral-300 font-medium">Location</label>
                          <input
                            name="location"
                            defaultValue={settings.location}
                            className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-neutral-300 font-medium">WhatsApp Pre-filled Message</label>
                        <input
                          name="whatsappMessage"
                          defaultValue={settings.whatsappMessage}
                          className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-neutral-300 font-medium">Calendly URL</label>
                        <input
                          name="calendlyUrl"
                          defaultValue={settings.calendlyUrl}
                          className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <button
                        type="submit"
                        className="py-2.5 px-6 rounded-xl font-semibold bg-cyan-400 text-black hover:bg-cyan-300 transition cursor-pointer"
                      >
                        Save Configuration
                      </button>
                    </form>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* ---------------- MODALS ---------------- */}

      {/* 1. Project Add/Edit Modal */}
      {projectModal.open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-bold text-sm text-white">
                {projectModal.item ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={() => setProjectModal({ open: false })}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-3.5 text-xs font-sans">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-neutral-300">Project Title</label>
                  <input
                    name="title"
                    required
                    defaultValue={projectModal.item?.title || ""}
                    placeholder="e.g. Nova Cloud Systems"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-300">Category</label>
                  <input
                    name="category"
                    required
                    defaultValue={projectModal.item?.category || "Web Development"}
                    placeholder="e.g. Cloud Infrastructure"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300">Subtitle</label>
                <input
                  name="subtitle"
                  required
                  defaultValue={projectModal.item?.subtitle || ""}
                  placeholder="e.g. High-Speed Server Architecture"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300">Description</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  defaultValue={projectModal.item?.description || ""}
                  placeholder="Comprehensive description of the client deliverable..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300">Image URL</label>
                <input
                  name="image"
                  required
                  defaultValue={projectModal.item?.image || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300">Tech Stack (comma separated)</label>
                <input
                  name="tech"
                  defaultValue={projectModal.item?.tech?.join(", ") || "Next.js, React, TailwindCSS"}
                  placeholder="Go, Kubernetes, Redis, AWS"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-neutral-300">Speed Metric</label>
                  <input
                    name="metric_speed"
                    defaultValue={projectModal.item?.metrics?.speed || "0.4ms Latency"}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-[11px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-300">Load Metric</label>
                  <input
                    name="metric_load"
                    defaultValue={projectModal.item?.metrics?.load || "50k req/s"}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-[11px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-300">Uptime Metric</label>
                  <input
                    name="metric_uptime"
                    defaultValue={projectModal.item?.metrics?.uptime || "99.999%"}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-[11px]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured_check"
                  defaultChecked={projectModal.item?.featured ?? true}
                  className="rounded border-neutral-700"
                />
                <label htmlFor="featured_check" className="text-neutral-300 text-xs">
                  Display prominently as featured project
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setProjectModal({ open: false })}
                  className="px-4 py-2 rounded-xl border border-neutral-800 text-neutral-300 hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Testimonial Add/Edit Modal */}
      {testimonialModal.open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-bold text-sm text-white">
                {testimonialModal.item ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <button
                onClick={() => setTestimonialModal({ open: false })}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-3.5 text-xs font-sans">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-neutral-300">Client Name</label>
                  <input
                    name="name"
                    required
                    defaultValue={testimonialModal.item?.name || ""}
                    placeholder="Sarah Chen"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-300">Company</label>
                  <input
                    name="company"
                    required
                    defaultValue={testimonialModal.item?.company || ""}
                    placeholder="TechFlow Inc"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-neutral-300">Role / Position</label>
                  <input
                    name="role"
                    required
                    defaultValue={testimonialModal.item?.role || "CTO"}
                    placeholder="e.g. VP of Engineering"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-300">Rating (1 to 5 Stars)</label>
                  <select
                    name="rating"
                    defaultValue={testimonialModal.item?.rating || 5}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                    <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                    <option value={3}>3 Stars ⭐⭐⭐</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300">Photo / Avatar URL</label>
                <input
                  name="photo"
                  required
                  defaultValue={testimonialModal.item?.photo || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face"}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300">Review Content</label>
                <textarea
                  name="content"
                  required
                  rows={4}
                  defaultValue={testimonialModal.item?.content || ""}
                  placeholder="Share feedback on NSSolutions speed, code quality, and delivery..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setTestimonialModal({ open: false })}
                  className="px-4 py-2 rounded-xl border border-neutral-800 text-neutral-300 hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Career Add/Edit Modal */}
      {careerModal.open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-bold text-sm text-white">
                {careerModal.item ? "Edit Job Opening" : "Create Career Opening"}
              </h3>
              <button
                onClick={() => setCareerModal({ open: false })}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCareer} className="space-y-3.5 text-xs font-sans">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-neutral-300">Role Title</label>
                  <input
                    name="title"
                    required
                    defaultValue={careerModal.item?.title || ""}
                    placeholder="Senior Full-Stack Engineer"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-300">Department</label>
                  <input
                    name="department"
                    required
                    defaultValue={careerModal.item?.department || "Engineering"}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-neutral-300">Location</label>
                  <input
                    name="location"
                    defaultValue={careerModal.item?.location || "Remote (Global)"}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-300">Type</label>
                  <input
                    name="type"
                    defaultValue={careerModal.item?.type || "Full-Time"}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-300">Salary</label>
                  <input
                    name="salary"
                    defaultValue={careerModal.item?.salary || "$140k - $180k"}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300">Description</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  defaultValue={careerModal.item?.description || ""}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300">Requirements (one per line)</label>
                <textarea
                  name="requirements"
                  rows={3}
                  defaultValue={careerModal.item?.requirements?.join("\n") || ""}
                  placeholder="5+ years experience with Next.js..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300">Status</label>
                <select
                  name="status"
                  defaultValue={careerModal.item?.status || "active"}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                >
                  <option value="active">Active (Accepting applications)</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setCareerModal({ open: false })}
                  className="px-4 py-2 rounded-xl border border-neutral-800 text-neutral-300 hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300"
                >
                  Save Job Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. AI Model Add/Edit Modal */}
      {modelModal.open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-bold text-sm text-white">
                {modelModal.item ? "Edit AI Model" : "Register New AI Model"}
              </h3>
              <button
                onClick={() => setModelModal({ open: false })}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModel} className="space-y-3.5 text-xs font-sans">
              <div className="space-y-1">
                <label className="text-neutral-300">Model Name</label>
                <input
                  name="name"
                  required
                  defaultValue={modelModal.item?.name || ""}
                  placeholder="Vortex Vision Engine v4.0"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300">Tagline</label>
                <input
                  name="tagline"
                  required
                  defaultValue={modelModal.item?.tagline || ""}
                  placeholder="High-Frequency Task Dispatcher"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300">Description</label>
                <textarea
                  name="description"
                  required
                  rows={2}
                  defaultValue={modelModal.item?.description || ""}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-neutral-300">Parameters</label>
                  <input
                    name="parameters"
                    defaultValue={modelModal.item?.parameters || "1.4 Billion Parameters"}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-300">Tokens / Context</label>
                  <input
                    name="tokens"
                    defaultValue={modelModal.item?.tokens || "Up to 32k context"}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-neutral-300">Latency</label>
                  <input
                    name="latency"
                    defaultValue={modelModal.item?.latency || "38ms"}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-300">Accuracy</label>
                  <input
                    name="accuracy"
                    defaultValue={modelModal.item?.accuracy || "99.1% precision"}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300">Use Case</label>
                <input
                  name="useCase"
                  defaultValue={modelModal.item?.useCase || "Customer intent mapping microservices"}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setModelModal({ open: false })}
                  className="px-4 py-2 rounded-xl border border-neutral-800 text-neutral-300 hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300"
                >
                  Save Model
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Database Connection Info Modal */}
      {dbInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-sm text-white">MongoDB Cloud Connection</h3>
              </div>
              <button
                onClick={() => setDbInfoModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-300 leading-relaxed">
              <p>
                Status:{" "}
                <span className="font-mono text-cyan-300 font-semibold">
                  {dbStatus?.isConnected ? "Connected to MongoDB" : "Local Storage (MongoDB Ready)"}
                </span>
              </p>
              <p className="text-neutral-400">{dbStatus?.message}</p>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 font-mono text-[11px]">
                <div className="text-neutral-400">To link your MongoDB Atlas cluster:</div>
                <div className="text-cyan-300">1. Open .env.local in project root</div>
                <div className="text-cyan-300">
                  2. Add: MONGODB_URI=mongodb+srv://&lt;user&gt;:&lt;password&gt;@cluster0...
                </div>
                <div className="text-neutral-400">
                  3. Restart your dev server. NSSolutions will automatically connect and seed your MongoDB database!
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setDbInfoModal(false)}
                className="px-5 py-2 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 text-xs"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
