import { NextResponse } from "next/server";
import { getAdminSession } from "./jwt";

export async function requireAdmin(request) {
  const session = await getAdminSession(request);

  if (!session) {
    return {
      session: null,
      error: NextResponse.json(
        { success: false, msg: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  return { session, error: null };
}
