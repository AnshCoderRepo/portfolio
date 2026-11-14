import { NextResponse } from "next/server";
import { DataService } from "@/lib/data-service";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const plans = await DataService.getPricing();
    return NextResponse.json({ success: true, data: plans });
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
    if (!body.planName || !body.price) {
      return NextResponse.json(
        { error: "Plan name and price are required" },
        { status: 400 }
      );
    }

    const plan = await DataService.createPricingPlan(body);
    return NextResponse.json({ success: true, data: plan }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
