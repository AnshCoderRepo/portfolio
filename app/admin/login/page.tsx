"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, Eye, EyeOff, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter the admin password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030611] text-neutral-100 flex items-center justify-center px-4 relative overflow-hidden font-sans">
      {/* Background Neon Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="bg-grid-theme absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono tracking-wider mb-2 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>NSSolutions Control Core</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-cyan-300">
            Admin Portal
          </h1>
          <p className="text-xs text-neutral-400 max-w-xs mx-auto">
            Authorize with your master administrator passcode to manage database collections and site services.
          </p>
        </div>

        {/* Login Box */}
        <div className="backdrop-blur-xl bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-7 sm:p-8 shadow-2xl relative">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-300 flex items-center justify-between">
                <span>Master Passcode</span>
                <span className="text-[10px] text-neutral-500 font-mono">
                  Default: <span className="text-cyan-400">nssolutions2026</span>
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-neutral-300 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-indigo-500 text-black hover:opacity-95 shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Unlock Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick link back */}
          <div className="mt-6 pt-5 border-t border-neutral-800/80 text-center">
            <Link
              href="/"
              className="text-xs text-neutral-400 hover:text-cyan-400 transition inline-flex items-center gap-1.5"
            >
              ← Return to NSSolutions Public Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
