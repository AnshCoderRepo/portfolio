import mongoose, { Schema, model, models } from "mongoose";

export interface ISiteSetting {
  _id?: string;
  name: string;
  authorName: string;
  title: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  location: string;
  whatsappPhone: string;
  whatsappMessage: string;
  calendlyUrl: string;
  updatedAt?: Date;
}

const SiteSettingSchema = new Schema<ISiteSetting>(
  {
    name: { type: String, default: "NSSolutions" },
    authorName: { type: String, default: "Ansh Coder" },
    title: {
      type: String,
      default: "NSSolutions | Premium Digital Product & Freelancing Solutions",
    },
    description: {
      type: String,
      default:
        "NSSolutions is an elite collective of freelancers converting real-world client visions into robust web systems, mobile applications, and high-performance server architectures.",
    },
    url: { type: String, default: "https://nssolutions.dev" },
    email: { type: String, default: "nssolution583@gmail.com" },
    phone: { type: String, default: "+91 7070410031" },
    location: { type: String, default: "San Francisco, CA" },
    whatsappPhone: { type: String, default: "917070410031" },
    whatsappMessage: {
      type: String,
      default: "Hi NSSolutions! I'd like to discuss a project.",
    },
    calendlyUrl: {
      type: String,
      default: "https://calendly.com/nssolutions",
    },
  },
  { timestamps: true }
);

export const SiteSettingModel =
  models.SiteSetting || model<ISiteSetting>("SiteSetting", SiteSettingSchema);
