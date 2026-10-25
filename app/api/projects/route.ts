import { NextResponse } from "next/server";
import { DataService } from "@/lib/data-service";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const projects = await DataService.getProjects();
    return NextResponse.json({ success: true, data: projects });
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
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const project = await DataService.createProject(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
