import mongoose, { Schema, model, models } from "mongoose";

export interface IStatItem {
  _id?: string;
  id?: string;
  target: number;
  suffix?: string;
  label: string;
  order?: number;
}

const StatItemSchema = new Schema<IStatItem>(
  {
    target: { type: Number, required: true },
    suffix: { type: String, default: "+" },
    label: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const StatItemModel =
  models.StatItem || model<IStatItem>("StatItem", StatItemSchema);
