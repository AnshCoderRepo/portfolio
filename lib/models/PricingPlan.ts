import mongoose, { Schema, model, models } from "mongoose";

export interface IPricingPlan {
  _id?: string;
  id?: string;
  planName: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  buttonVariant?: "primary" | "secondary";
  order?: number;
}

const PricingPlanSchema = new Schema<IPricingPlan>(
  {
    planName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    period: { type: String, default: "month" },
    features: { type: [String], default: [] },
    buttonText: { type: String, default: "Get Started" },
    isPopular: { type: Boolean, default: false },
    buttonVariant: { type: String, enum: ["primary", "secondary"], default: "primary" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const PricingPlanModel =
  models.PricingPlan || model<IPricingPlan>("PricingPlan", PricingPlanSchema);
