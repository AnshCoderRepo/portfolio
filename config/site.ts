export const siteConfig = {
  name: "ASSolutions",
  authorName: "Ansh Coder",
  title: "ASSolutions | Premium Digital Product & Freelancing Solutions",
  description:
    "ASSolutions is an elite collective of freelancers converting real-world client visions into robust web systems, mobile applications, and high-performance server architectures.",
  url: "https://assolutions.dev",
  ogImage: "/og-image.svg",
  creator: "@assolutions",
  githubRepo: "https://github.com/AnshCoderRepo",

  contact: {
    email: "hello@assolutions.com",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA",
    whatsappPhone: "15550192834",
    whatsappMessage: "Hi ASSolutions! I'd like to discuss a project.",
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
    twitter: "https://twitter.com/assolutions",
    linkedin: "https://linkedin.com/company/assolutions",
    instagram: "https://instagram.com/assolutions",
    youtube: "https://youtube.com/@assolutions",
  },

  keywords: [
    "freelance web development",
    "ASSolutions",
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
