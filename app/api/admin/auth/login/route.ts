import { NextResponse } from "next/server";
import { verifyAdminPassword, setAdminSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, error: "Password is required" },
        { status: 400 }
      );
    }

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: "Invalid master admin password" },
        { status: 401 }
      );
    }

    await setAdminSessionCookie();

    return NextResponse.json({
      success: true,
      message: "Admin authentication successful",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
