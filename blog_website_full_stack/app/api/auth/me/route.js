import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/jwt";

export async function GET(request) {
  const session = await getAdminSession(request);

  if (!session) {
    return NextResponse.json({ success: false, msg: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    admin: { email: session.sub, role: session.role },
  });
}
