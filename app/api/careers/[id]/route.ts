import { NextResponse } from "next/server";
import { DataService } from "@/lib/data-service";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await props.params;
    const body = await request.json();
    const updated = await DataService.updateCareer(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Job opening not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await props.params;
    const deleted = await DataService.deleteCareer(id);

    if (!deleted) {
      return NextResponse.json({ error: "Job opening not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Job opening deleted" });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
