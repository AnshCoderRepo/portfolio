"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        <div className="flex items-center gap-3 rounded-b-2xl bg-nav-bg px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
          <ThemeToggle />
          {siteConfig.navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="text-[10px] transition-colors sm:text-xs md:text-sm"
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
        </div>
      </div>
    </>
  );
}