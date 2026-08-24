import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import GlobalProviders from "@/components/providers/global-providers";


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

const SITE_URL = "https://assolutions.dev";

export const metadata: Metadata = {
  title: "ASSolutions | Premium Digital Product & Freelancing Solutions",
  description:
    "ASSolutions is an elite collective of freelancers converting real-world client visions into robust web systems, mobile applications, and high-performance server architectures.",
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
  authors: [{ name: "ASSolutions Team", url: "https://github.com/AnshCoderRepo" }],
  creator: "Ansh Coder",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "ASSolutions | Premium Digital Product & Freelancing Solutions",
    description:
      "Expert freelancers converting real-world client visions into robust web systems, mobile applications, and high-performance server architectures.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "ASSolutions",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ASSolutions - Premium Digital Product & Freelancing Solutions",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASSolutions | Premium Freelancing Solutions",
    description: "Expert freelancers converting ideas into premium digital solutions.",
    images: ["/og-image.svg"],
    creator: "@assolutions",
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
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="canonical" href={SITE_URL} />
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
