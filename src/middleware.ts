import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limiting configuration
const RATE_LIMIT = 100; // requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
const ipRequests = new Map<string, { count: number; timestamp: number }>();

// Rate limiting middleware
const rateLimiter = (req: NextRequest) => {
  // Get IP from headers or fallback to remote address
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const now = Date.now();
  const requestData = ipRequests.get(ip);

  if (requestData) {
    // Reset if window has passed
    if (now - requestData.timestamp > RATE_LIMIT_WINDOW) {
      ipRequests.set(ip, { count: 1, timestamp: now });
      return true;
    }

    // Check if rate limit exceeded
    if (requestData.count >= RATE_LIMIT) {
      return false;
    }

    // Increment request count
    requestData.count++;
    ipRequests.set(ip, requestData);
    return true;
  }

  // First request from this IP
  ipRequests.set(ip, { count: 1, timestamp: now });
  return true;
};

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRequests.entries()) {
    if (now - data.timestamp > RATE_LIMIT_WINDOW) {
      ipRequests.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW);

export default authMiddleware({
  publicRoutes: [
    "/",
    "/store",
    "/api/webhook/clerk",
    "/api/stores",
    "/api/stores/:id",
    "/api/medications",
    "/api/medications/:id",
    "/api/test",
    "/sign-in",
    "/sign-up",
  ],
  ignoredRoutes: [
    "/((?!api|trpc))(_next.*|.+\\.[\\w]+$)",
    "/api/webhook/clerk",
  ],
  async afterAuth(auth, req) {
    // Apply rate limiting to API routes
    if (
      auth.isApiRoute &&
      !req.nextUrl.pathname.startsWith("/api/webhook/clerk")
    ) {
      if (!rateLimiter(req)) {
        return new NextResponse(
          JSON.stringify({ error: "Too many requests" }),
          { status: 429, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // If the route is ignored, proceed without authentication
    if (auth.isApiRoute && req.nextUrl.pathname === "/api/webhook/clerk") {
      return NextResponse.next();
    }

    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Handle role-based access
    const role = auth.sessionClaims?.role as string;
    const path = req.nextUrl.pathname;

    // Admin routes
    if (path.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Pharmacist routes
    if (path.startsWith("/pharmacist") && role !== "PHARMACIST") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Patient routes
    if (path.startsWith("/patient") && role !== "PATIENT") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Check if accessing pharmacist routes
    if (path.startsWith("/dashboard/pharmacist")) {
      try {
        const verifyResponse = await fetch(
          `${req.nextUrl.origin}/api/pharmacist/verify`,
          {
            method: "POST",
            headers: {
              Authorization: req.headers.get("Authorization") || "",
              "Content-Type": "application/json",
            },
          }
        );

        if (!verifyResponse.ok) {
          console.error(
            "Pharmacist verification failed:",
            await verifyResponse.text()
          );
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      } catch (error) {
        console.error("Error verifying pharmacist:", error);
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    // Add security headers
    const response = NextResponse.next();
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    );

    return response;
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
