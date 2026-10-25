import mongoose, { Schema, model, models } from "mongoose";

export interface IProject {
  _id?: string;
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tech: string[];
  metrics: Record<string, string>;
  iconName?: string;
  color: string;
  glow: string;
  image: string;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tech: { type: [String], default: [] },
    metrics: { type: Map, of: String, default: {} },
    iconName: { type: String, default: "Server" },
    color: { type: String, default: "from-blue-600 to-indigo-600" },
    glow: { type: String, default: "rgba(37, 99, 235, 0.15)" },
    image: { type: String, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ProjectModel = models.Project || model<IProject>("Project", ProjectSchema);
