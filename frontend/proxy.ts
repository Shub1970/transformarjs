import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const access_token = request.cookies.get("access_token")?.value;
  if (!access_token) {
    const redirect_url = request.nextUrl.clone();
    redirect_url.pathname = "/";
    redirect_url.searchParams.set("login", "true");
    return NextResponse.redirect(redirect_url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/models/:path*",
};
