"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import PageTransition from "@/components/ui/page-transition";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import BookACall from "@/components/ui/book-a-call";

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PageTransition>{children}</PageTransition>
      <WhatsAppButton />
      <BookACall />
    </ThemeProvider>
  );
}
