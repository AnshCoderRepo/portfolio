import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Discovery Call | NSSolutions",
  description:
    "Schedule a dedicated 30-minute technical consultation with NSSolutions software architects. Discuss your project requirements, tech stack, roadmap, and delivery milestones.",
  openGraph: {
    title: "Book a Discovery Call | NSSolutions",
    description:
      "Schedule a dedicated 30-minute technical consultation with NSSolutions software architects.",
  },
};

export default function BookACallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
