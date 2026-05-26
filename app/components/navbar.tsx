"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Our story", href: "/story" },
  { label: "Projects", href: "/projects" },
  { label: "Career", href: "/career" },
  { label: "Models", href: "/models" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="text-[10px] transition-colors sm:text-xs md:text-sm"
              style={{
                color: isActive ? "#E1E0CC" : "rgba(225, 224, 204, 0.8)",
                fontWeight: isActive ? "600" : "normal",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)";
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}