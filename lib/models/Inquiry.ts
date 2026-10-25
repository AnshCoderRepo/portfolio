import mongoose, { Schema, model, models } from "mongoose";

export interface IInquiry {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  source: "contact_page" | "project_estimator" | "hero_lead";
  budget?: string;
  timeline?: string;
  status: "unread" | "read" | "replied";
  createdAt?: Date;
  updatedAt?: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, default: "New Project Inquiry" },
    message: { type: String, required: true },
    source: {
      type: String,
      enum: ["contact_page", "project_estimator", "hero_lead"],
      default: "contact_page",
    },
    budget: { type: String },
    timeline: { type: String },
    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
    },
  },
  { timestamps: true }
);

export const InquiryModel =
  models.Inquiry || model<IInquiry>("Inquiry", InquirySchema);
