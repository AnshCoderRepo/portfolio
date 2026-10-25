import { NextResponse } from "next/server";
import { DataService } from "@/lib/data-service";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const careers = await DataService.getCareers();
    return NextResponse.json({ success: true, data: careers });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title || !body.department || !body.description) {
      return NextResponse.json(
        { error: "Title, department, and description are required" },
        { status: 400 }
      );
    }

    const career = await DataService.createCareer(body);
    return NextResponse.json({ success: true, data: career }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
