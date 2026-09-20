import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import GlobalProviders from "@/components/providers/global-providers";


import { siteConfig } from "@/config/site";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: `${siteConfig.name} Team`, url: siteConfig.githubRepo }],
  creator: siteConfig.authorName,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Premium Digital Product & Freelancing Solutions`,
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Premium Freelancing Solutions`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} dark h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="canonical" href={siteConfig.url} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-accent-color/30 selection:text-accent-color" suppressHydrationWarning>
        <GlobalProviders>
          <Navbar />
          <main className="flex-grow">{children}</main>
          {modal}
          <Footer />
        </GlobalProviders>
      </body>
    </html>
  );
}
