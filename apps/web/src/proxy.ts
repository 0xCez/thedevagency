import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "fr"] as const;
const defaultLocale = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals, API routes, and files with extensions (favicon.ico, etc.)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) return;

  // Detect locale from Accept-Language header (simple match — fr* → fr, else en)
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const detectedLocale: (typeof locales)[number] =
    acceptLanguage.toLowerCase().startsWith("fr") ? "fr" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\.).*)"],
};
