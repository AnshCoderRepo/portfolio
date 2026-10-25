import mongoose, { Schema, model, models } from "mongoose";

export interface ICareer {
  _id?: string;
  id?: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  status: "active" | "closed";
  createdAt?: Date;
  updatedAt?: Date;
}

const CareerSchema = new Schema<ICareer>(
  {
    title: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true, default: "Full-Time" },
    salary: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], default: [] },
    status: { type: String, enum: ["active", "closed"], default: "active" },
  },
  { timestamps: true }
);

export const CareerModel = models.Career || model<ICareer>("Career", CareerSchema);
