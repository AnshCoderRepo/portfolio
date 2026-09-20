import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface ProjectMetric {
  [key: string]: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tech: string[];
  metrics: ProjectMetric;
  icon: LucideIcon;
  color: string;
  glow: string;
  image: string;
}

export interface ModelSpecs {
  Architecture: string;
  Framework: string;
  Dataset: string;
  [key: string]: string;
}

export interface AIModel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  parameters: string;
  tokens: string;
  latency: string;
  accuracy: string;
  useCase: string;
  specs: ModelSpecs;
  icon: LucideIcon;
  color: string;
  gradient: string;
}

export interface JobPosition {
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
}

export interface CompanyPerk {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface PricingPlan {
  planName: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  buttonVariant?: "primary" | "secondary";
}

export interface StatItem {
  target: number;
  suffix?: string;
  label: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  photo: string;
}
