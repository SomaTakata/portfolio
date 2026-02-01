import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Create next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

// Protected and auth routes
const protectedRoutes = ["/dashboard"];
const authRoutes = ["/sign-in", "/sign-up"];

async function middleware(request: NextRequest) {
  // First, apply i18n routing
  const response = intlMiddleware(request);

  // Then check authentication
  const pathname = request.nextUrl.pathname;

  // Extract pathname without locale
  const pathnameWithoutLocale = pathname.split("/").slice(2).join("/") || "/";

  // Get session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If user is not authenticated and trying to access protected route
  if (
    !session &&
    protectedRoutes.some((route) => pathnameWithoutLocale.startsWith(route))
  ) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}/sign-in`, request.url),
    );
  }

  // If user is authenticated but trying to access auth routes
  if (
    session &&
    authRoutes.some((route) => pathnameWithoutLocale.startsWith(route))
  ) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}/dashboard`, request.url),
    );
  }

  return response;
}

export { middleware as proxy };

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
