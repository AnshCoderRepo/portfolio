"use client";

const navItems = ["Our story", "Projects", "Career", "Models", "Connect"];

export default function Navbar() {
  return (
    <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
        {navItems.map((item) => (
          <a
            key={item}
            href="#"
            className="text-[10px] transition-colors sm:text-xs md:text-sm"
            style={{ color: "rgba(225, 224, 204, 0.8)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}