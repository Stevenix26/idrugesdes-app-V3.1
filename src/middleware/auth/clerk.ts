import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/contact",
  "/about",
  "/help",
  "/store",
  "/sign-in*",
  "/sign-up*",
  "/auth/sign-up/verify-email-address*",
  "/auth/sign-up/sso-callback*",
  "/auth/verify-email*",
  "/auth/pharmacist-verification*",
  "/auth/admin-verification*",
  "/api/webhook/clerk",
];

// Protected API routes
const protectedApiRoutes = [
  "/api/prescriptions*",
  "/api/users*",
  "/api/pharmacist*",
  "/api/medications*",
  "/api/orders*",
];

// Export the routes for reuse in other parts of the application
export { publicRoutes, protectedApiRoutes };

// Create the middleware instance
export const clerkMiddleware = authMiddleware({
  publicRoutes: publicRoutes,
  ignoredRoutes: [
    "/((?!api|trpc))(_next.*|.+.[\\w]+$)", // Ignore static files
    "/api/webhook/clerk", // Ignore Clerk webhook
  ],
  debug: process.env.NODE_ENV === "development",

  // Add afterAuth callback for additional control
  afterAuth(auth, req) {
    // Handle authentication logic
    const isApiRoute = req.url.includes("/api/");
    const isPublicApiRoute = req.url.includes("/api/webhook/clerk");
    const isProtectedApiRoute = protectedApiRoutes.some((route) =>
      req.url.includes(route.replace("*", ""))
    );

    // If it's a protected API route and user is not authenticated
    if (
      isApiRoute &&
      isProtectedApiRoute &&
      !auth.userId &&
      !isPublicApiRoute
    ) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Allow the request to proceed
    return NextResponse.next();
  },
});

// Export the middleware configuration
export const config = {
  matcher: [
    // Match all routes except static files and ignored routes
    "/((?!.*\\.|_next|api/webhook).*)",
    // Match API routes that need authentication
    "/api/prescriptions/:path*",
    "/api/users/:path*",
    "/api/pharmacist/:path*",
    "/api/medications/:path*",
    "/api/orders/:path*",
  ],
};
