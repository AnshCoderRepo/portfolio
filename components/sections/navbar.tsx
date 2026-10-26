"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop nav — hidden below sm */}
      <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2 hidden sm:block">
        <div className="flex items-center gap-2.5 rounded-b-2xl bg-nav-bg px-4 py-2 sm:gap-4 md:gap-6 md:rounded-b-3xl md:px-7 lg:gap-8">
          <ThemeToggle />
          {siteConfig.navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="text-[10px] transition-colors sm:text-xs md:text-sm whitespace-nowrap"
                style={{
                  color: isActive ? "var(--accent-color)" : "var(--muted-foreground)",
                  fontWeight: isActive ? "600" : "normal",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent-color)")
                }
                onMouseLeave={(e) => {
                  if (!isActive)
                    e.currentTarget.style.color = "var(--muted-foreground)";
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/book-a-call"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              pathname === "/book-a-call"
                ? "bg-accent-color text-background shadow-[0_0_15px_rgba(225,224,204,0.35)]"
                : "bg-accent-color/15 text-accent-color border border-accent-color/30 hover:bg-accent-color hover:text-background"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book a Call</span>
          </Link>
        </div>
      </nav>

      {/* Mobile hamburger button — visible below sm */}
      <button
        className="sm:hidden fixed top-3 right-3 z-50 p-2 rounded-xl bg-surface/80 backdrop-blur-sm border border-card-border text-surface-foreground/80 hover:text-surface-foreground transition-colors"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="sm:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile slide-out drawer */}
      <div
        className={`sm:hidden fixed top-0 right-0 z-40 h-full w-64 bg-surface/95 backdrop-blur-xl border-l border-card-border transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col pt-16 px-6 gap-1">
          <div className="flex justify-end px-4 pb-4">
            <ThemeToggle />
          </div>
          {siteConfig.navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="py-3 px-4 rounded-xl text-sm transition-colors"
                style={{
                  color: isActive ? "var(--accent-color)" : "var(--muted-foreground)",
                  fontWeight: isActive ? "600" : "normal",
                  backgroundColor: isActive ? "var(--card)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent-color)";
                  e.currentTarget.style.backgroundColor = "var(--card)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--muted-foreground)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-card-border mt-2">
            <Link
              href="/book-a-call"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-accent-color text-background transition-all hover:opacity-95 shadow-md shadow-accent-color/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Call</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}