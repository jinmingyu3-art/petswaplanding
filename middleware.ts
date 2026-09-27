import { NextResponse } from "next/server";

// Admin area is disabled: every /admin route returns 404.
export function middleware() {
  return new NextResponse(null, { status: 404 });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
