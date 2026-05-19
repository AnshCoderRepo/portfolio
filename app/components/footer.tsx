'use client';

import { Mail, MapPin, Phone, Zap } from 'lucide-react';
import { 
  FaInstagram, 
  FaLinkedin, 
  FaTwitter, 
  FaYoutube, 
  FaGithub 
} from 'react-icons/fa6';
import Link from 'next/link';

const footerColumns = [
  {
    title: 'Solutions',
    links: [
      'Business Automation',
      'Cloud Services',
      'Analytics',
      'Integrations',
      'Support',
    ],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Case Studies', 'Blog', 'Webinars', 'Community'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Contact', 'Partners', 'Press'],
  },
];

const legalLinks = [
  'Terms of Service',
  'Privacy Policy',
  'Cookie Settings',
  'Accessibility',
];

const socialIcons = [
  { icon: <FaInstagram className="h-5 w-5" />, href: '#' },
  { icon: <FaTwitter className="h-5 w-5" />, href: '#' },
  { icon: <FaLinkedin className="h-5 w-5" />, href: '#' },
  { icon: <FaYoutube className="h-5 w-5" />, href: '#' },
  { icon: <FaGithub className="h-5 w-5" />, href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-background text-foreground relative w-full pt-20 pb-10 overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full overflow-hidden">
        <div className="bg-primary absolute top-1/3 left-1/4 h-64 w-64 rounded-full opacity-10 blur-3xl" />
        <div className="bg-primary absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full opacity-10 blur-3xl" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="glass-effect mb-16 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold md:text-3xl tracking-tight">
                Stay ahead with my latest work.
              </h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Subscribe to get updates on new projects, design tips, and modern web development insights.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border-foreground/20 bg-background/50 focus:ring-primary rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none transition-all w-full"
                />
                <button className="bg-primary text-primary-foreground shadow-primary/20 hover:shadow-primary/40 rounded-xl px-8 py-3 font-semibold shadow-lg transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="hidden justify-end md:flex">
              <div className="relative group">
                <div className="bg-primary/20 absolute inset-0 rotate-6 rounded-2xl transition-transform group-hover:rotate-12" />
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&h=240&q=80"
                  alt="Workspace"
                  className="relative w-80 rounded-2xl object-cover shadow-2xl transition-transform group-hover:-translate-y-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-6 flex items-center space-x-2">
              <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-xl shadow-lg shadow-primary/30">
                <Zap className="text-primary-foreground h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tighter">ANSH CODER</span>
            </div>
            <p className="text-foreground/60 mb-6 leading-relaxed">
              Crafting premium digital experiences with modern web technologies and creative design.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="bg-white/5 hover:bg-primary/20 border border-white/10 flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:scale-110"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
          
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-primary/80">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((text) => (
                  <li key={text}>
                    <a
                      href="#"
                      className="text-foreground/60 hover:text-primary transition-colors duration-300"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-white/10 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <p className="text-foreground/40 mb-4 text-sm md:mb-0">
            © {new Date().getFullYear()} Ansh Coder. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {legalLinks.map((text) => (
              <a
                key={text}
                href="#"
                className="text-foreground/40 hover:text-primary transition-colors text-sm"
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}