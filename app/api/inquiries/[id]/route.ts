import { NextResponse } from "next/server";
import { DataService } from "@/lib/data-service";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function PATCH(
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
    const { status } = body;

    if (!status || !["unread", "read", "replied"].includes(status)) {
      return NextResponse.json(
        { error: "Valid status ('unread', 'read', 'replied') required" },
        { status: 400 }
      );
    }

    const updated = await DataService.updateInquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
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
    const deleted = await DataService.deleteInquiry(id);

    if (!deleted) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
