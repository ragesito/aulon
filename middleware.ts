import { NextRequest, NextResponse } from "next/server";

/**
 * HTTP Basic Auth for /admin.
 * Credentials come from ADMIN_USER / ADMIN_PASSWORD env vars.
 * If they're not configured, /admin is completely disabled (404-like 401).
 */
export function middleware(req: NextRequest) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPass = process.env.ADMIN_PASSWORD;

  const unauthorized = () =>
    new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Aulon Admin", charset="UTF-8"',
        "X-Robots-Tag": "noindex, nofollow",
      },
    });

  if (!expectedUser || !expectedPass) return unauthorized();

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return unauthorized();

  let user = "";
  let pass = "";
  try {
    const decoded = atob(auth.slice(6));
    const i = decoded.indexOf(":");
    user = decoded.slice(0, i);
    pass = decoded.slice(i + 1);
  } catch {
    return unauthorized();
  }

  // Constant-time-ish comparison (lengths leak, values don't)
  const ok =
    safeEqual(user, expectedUser) && safeEqual(pass, expectedPass);
  if (!ok) return unauthorized();

  return NextResponse.next();
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const config = {
  matcher: ["/admin/:path*"],
};
