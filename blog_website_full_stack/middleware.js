import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth/constants";
import { verifyAuthToken } from "@/lib/auth/jwt";

async function isAuthenticated(request) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const payload = await verifyAuthToken(token);
  return payload?.role === "admin";
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const loggedIn = await isAuthenticated(request);

    if (pathname === "/admin/login") {
      if (loggedIn) {
        return NextResponse.redirect(new URL("/admin/blogList", request.url));
      }
      return NextResponse.next();
    }

    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/blogList", request.url));
    }

    if (!loggedIn) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  if (pathname === "/api/blog" && request.method !== "GET") {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json(
        { success: false, msg: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  if (pathname === "/api/email") {
    const isPublicSubscribe = request.method === "POST";
    if (!isPublicSubscribe && !(await isAuthenticated(request))) {
      return NextResponse.json(
        { success: false, msg: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/blog", "/api/email"],
};
