import { NextResponse } from "next/server";
import { DataService } from "@/lib/data-service";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const models = await DataService.getAIModels();
    return NextResponse.json({ success: true, data: models });
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
    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: "Model name and description are required" },
        { status: 400 }
      );
    }

    const model = await DataService.createAIModel(body);
    return NextResponse.json({ success: true, data: model }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
