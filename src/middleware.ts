import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const role = request.cookies.get("role");
  if (
    request.nextUrl.pathname.startsWith("/ruler") &&
    role?.value !== "ruler"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    request.nextUrl.pathname.startsWith("/participants") &&
    role?.value !== "participants"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    request.nextUrl.pathname.startsWith("/judge") &&
    role?.value !== "judge"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    request.nextUrl.pathname.startsWith("/broadcast") &&
    role?.value !== "broadcast"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
