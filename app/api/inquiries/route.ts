import { NextResponse } from "next/server";
import { DataService } from "@/lib/data-service";
import { isAuthenticatedAdmin } from "@/lib/auth";

// Public submission of inquiries (Contact form, Project cost estimator, etc.)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const inquiry = await DataService.createInquiry(body);
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been received by NSSolutions.",
        data: inquiry,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

// Admin only: list all inquiries
export async function GET() {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const inquiries = await DataService.getInquiries();
    return NextResponse.json({ success: true, data: inquiries });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
