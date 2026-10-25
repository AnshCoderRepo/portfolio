export const siteConfig = {
  name: "NSSolutions",
  authorName: "Ansh Coder",
  title: "NSSolutions | Premium Digital Product & Freelancing Solutions",
  description:
    "NSSolutions is an elite collective of freelancers converting real-world client visions into robust web systems, mobile applications, and high-performance server architectures.",
  url: "https://nssolutions.dev",
  ogImage: "/og-image.svg",
  creator: "@nssolutions",
  githubRepo: "https://github.com/AnshCoderRepo",

  contact: {
    email: "hello@nssolutions.com",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA",
    whatsappPhone: "15550192834",
    whatsappMessage: "Hi NSSolutions! I'd like to discuss a project.",
    calendlyUrl: "https://calendly.com/your-actual-link",
  },

  navItems: [
    { label: "Home", href: "/" },
    { label: "Our story", href: "/story" },
    { label: "Projects", href: "/projects" },
    { label: "Career", href: "/career" },
    { label: "Models", href: "/models" },
    { label: "Contact Us", href: "/contact" },
  ],

  socialLinks: {
    github: "https://github.com/AnshCoderRepo",
    twitter: "https://twitter.com/nssolutions",
    linkedin: "https://linkedin.com/company/nssolutions",
    instagram: "https://instagram.com/nssolutions",
    youtube: "https://youtube.com/@nssolutions",
  },

  keywords: [
    "freelance web development",
    "NSSolutions",
    "Ansh Coder",
    "premium portfolio",
    "Next.js expert",
    "custom cloud design",
    "scalable web systems",
    "data annotation",
    "data collection",
    "AI solutions",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
