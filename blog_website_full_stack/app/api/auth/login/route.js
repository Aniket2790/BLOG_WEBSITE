import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ConnectDB } from "@/lib/config/db";
import AdminModel from "@/lib/models/AdminModel";
import { signAuthToken } from "@/lib/auth/jwt";
import { setAuthCookie } from "@/lib/auth/cookies";

export async function POST(request) {
  try {
    if (!process.env.JWT_SECRET) {
      console.error("POST /api/auth/login: JWT_SECRET is not set");
      return NextResponse.json(
        {
          success: false,
          msg: "Server auth is not configured. Set JWT_SECRET in .env and restart the dev server.",
        },
        { status: 503 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, msg: "Email and password are required" },
        { status: 400 }
      );
    }

    await ConnectDB();

    const admin = await AdminModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!admin?.passwordHash) {
      return NextResponse.json(
        { success: false, msg: "Invalid email or password" },
        { status: 401 }
      );
    }

    const passwordOk = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordOk) {
      return NextResponse.json(
        { success: false, msg: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await signAuthToken({
      sub: admin.email,
      role: admin.role || "admin",
    });

    const response = NextResponse.json({ success: true, msg: "Logged in" });
    setAuthCookie(response, token);
    return response;
  } catch (error) {
    console.error("POST /api/auth/login error:", error);

    if (error.message?.includes("MONGODB_URI")) {
      return NextResponse.json(
        {
          success: false,
          msg: "Database is not configured. Set MONGODB_URI in .env.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
