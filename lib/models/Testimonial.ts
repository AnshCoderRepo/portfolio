import mongoose, { Schema, model, models } from "mongoose";

export interface ITestimonial {
  _id?: string;
  id?: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  photo: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    rating: { type: Number, required: true, default: 5, min: 1, max: 5 },
    content: { type: String, required: true },
    photo: { type: String, required: true },
  },
  { timestamps: true }
);

export const TestimonialModel =
  models.Testimonial || model<ITestimonial>("Testimonial", TestimonialSchema);
