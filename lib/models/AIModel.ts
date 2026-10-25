import mongoose, { Schema, model, models } from "mongoose";

export interface IAIModel {
  _id?: string;
  id: string;
  name: string;
  tagline: string;
  description: string;
  parameters: string;
  tokens: string;
  latency: string;
  accuracy: string;
  useCase: string;
  specs: Record<string, string>;
  iconName?: string;
  color: string;
  gradient: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AIModelSchema = new Schema<IAIModel>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    parameters: { type: String, required: true },
    tokens: { type: String, required: true },
    latency: { type: String, required: true },
    accuracy: { type: String, required: true },
    useCase: { type: String, required: true },
    specs: { type: Map, of: String, default: {} },
    iconName: { type: String, default: "Brain" },
    color: { type: String, default: "from-indigo-500 to-cyan-500" },
    gradient: {
      type: String,
      default:
        "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)",
    },
  },
  { timestamps: true }
);

export const AIModelCollection =
  models.AIModel || model<IAIModel>("AIModel", AIModelSchema);
