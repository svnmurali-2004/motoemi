import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(req) {
  try {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;
    // If not authenticated, redirect to login (except for login page and public assets)
    if (!token) {
      if (
        pathname.startsWith("/login") ||
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.startsWith("/public")
      ) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // User data from token
    userdata = {
      id: token.id,
      email: token.email,
      role: token.role || "user",
      branch: token.branch || null,
    };
    // Role-based protection for /admin and /employee
    if (pathname.startsWith("/admin") && userdata.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (pathname.startsWith("/employee") && userdata.role !== "employee") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // Allow API routes if authenticated
    if (pathname.startsWith("/api")) {
      return NextResponse.next();
    }
    // Default: allow
    return NextResponse.next();
  } catch (err) {
    console.error("Middleware Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// Protect all routes except static files and public assets
export const config = {
  matcher: ["/((?!_next|favicon|public|api/auth|login).*)"],
};
