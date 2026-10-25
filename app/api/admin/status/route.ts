import { NextResponse } from "next/server";
import { DataService } from "@/lib/data-service";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function GET() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = await DataService.getStatus();
  const [projects, testimonials, careers, models, inquiries] = await Promise.all([
    DataService.getProjects(),
    DataService.getTestimonials(),
    DataService.getCareers(),
    DataService.getAIModels(),
    DataService.getInquiries(),
  ]);

  return NextResponse.json({
    status,
    counts: {
      projects: projects.length,
      testimonials: testimonials.length,
      careers: careers.length,
      models: models.length,
      inquiries: inquiries.length,
      unreadInquiries: inquiries.filter((i) => i.status === "unread").length,
    },
  });
}
