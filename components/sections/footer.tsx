'use client';

import { Zap, Lock, Mail, Phone } from 'lucide-react';
import { 
  FaInstagram, 
  FaLinkedin, 
  FaTwitter, 
  FaYoutube, 
  FaGithub 
} from 'react-icons/fa6';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';

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
  { icon: <FaInstagram className="h-5 w-5" />, href: siteConfig.socialLinks.instagram, label: 'Instagram' },
  { icon: <FaTwitter className="h-5 w-5" />, href: siteConfig.socialLinks.twitter, label: 'Twitter' },
  { icon: <FaLinkedin className="h-5 w-5" />, href: siteConfig.socialLinks.linkedin, label: 'LinkedIn' },
  { icon: <FaYoutube className="h-5 w-5" />, href: siteConfig.socialLinks.youtube, label: 'YouTube' },
  { icon: <FaGithub className="h-5 w-5" />, href: siteConfig.socialLinks.github, label: 'GitHub' },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-background text-foreground relative w-full pt-16 pb-10 overflow-hidden border-t border-surface-border">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full overflow-hidden">
        <div className="bg-primary absolute top-1/3 left-1/4 h-64 w-64 rounded-full opacity-10 blur-3xl" />
        <div className="bg-primary absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full opacity-10 blur-3xl" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Links Section */}
        <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-6 flex items-center space-x-2">
              <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-xl shadow-lg shadow-primary/30">
                <Zap className="text-primary-foreground h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tighter uppercase">{siteConfig.name}</span>
            </div>
            <p className="text-foreground/60 mb-4 leading-relaxed text-sm">
              Crafting premium digital experiences with modern web technologies and creative design.
            </p>
            <div className="space-y-2 mb-6 text-xs text-foreground/75 font-sans">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </a>
            </div>
            <div className="flex space-x-4">
              {socialIcons.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="bg-surface-alt hover:bg-primary/20 border border-surface-border flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:scale-110"
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
        <div className="border-surface-border flex flex-col items-center justify-between border-t pt-8 md:flex-row">
            <p className="text-foreground/40 mb-4 text-sm md:mb-0">
              © {new Date().getFullYear()} {siteConfig.authorName}. All rights reserved.
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
            <Link
              href="/admin"
              className="text-foreground/40 hover:text-primary transition-colors text-sm flex items-center gap-1"
            >
              <Lock className="w-3 h-3 text-cyan-400" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}