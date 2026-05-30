import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";


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
  title: "ASSolutions | Premium Digital Product & Freelancing Solutions",
  description: "ASSolutions is an elite collective of freelancers converting real-world client visions into robust web systems, mobile applications, and high-performance server architectures.",
  keywords: [
    "freelance web development",
    "ASSolutions",
    "Ansh Coder",
    "premium portfolio",
    "Next.js v16 expert",
    "custom cloud design",
    "scalable web systems",
  ],
  authors: [{ name: "ASSolutions Team", url: "https://github.com/AnshCoderRepo" }],
  creator: "Ansh Coder",
  openGraph: {
    title: "ASSolutions | Premium Digital Product & Freelancing Solutions",
    description: "Expert freelancers converting real-world client visions into robust web systems, mobile applications, and high-performance server architectures.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASSolutions | Premium Freelancing Solutions",
    description: "Expert freelancers converting ideas into premium digital solutions.",
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
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} h-full antialiased scroll-smooth dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-[#E1E0CC]/30 selection:text-[#E1E0CC]">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        {modal}
        <Footer />
      </body>
    </html>
  );
}
