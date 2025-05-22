import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/contact",
  "/about",
  "/help",
  "/store",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/auth/sign-up/verify-email-address(.*)",
  "/auth/sign-up/sso-callback(.*)",
  "/auth/verify-email(.*)",
  "/auth/pharmacist-verification(.*)",
  "/auth/admin-verification(.*)",
  "/api/webhook/clerk",
  "/api/stores",
  "/api/stores/:id",
  "/api/medications",
  "/api/medications/:id",
  "/api/test",
];

// Protected API routes that require authentication
const protectedApiRoutes = [
  "/api/prescriptions(.*)",
  "/api/users(.*)",
  "/api/pharmacist(.*)",
  "/api/medications(.*)",
  "/api/orders(.*)",
];

// Role-specific dashboard paths
const ROLE_DASHBOARDS = {
  PATIENT: "/dashboard/patient",
  PHARMACIST: "/dashboard/pharmacist",
  ADMIN: "/admin",
};

export default authMiddleware({
  publicRoutes: publicRoutes,
  ignoredRoutes: [
    "/((?!api|trpc))(_next.*|.+.[\\w]+$)", // Ignore static files
    "/api/webhook/clerk", // Ignore Clerk webhook
  ],
  debug: process.env.NODE_ENV === "development",

  async afterAuth(auth, req) {
    // Handle authentication logic
    const isApiRoute = req.url.includes("/api/");
    const isPublicApiRoute = req.url.includes("/api/webhook/clerk");
    const isProtectedApiRoute = protectedApiRoutes.some((route) =>
      req.url.includes(route.replace("(.*)", ""))
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

    // If the route is public, allow the request
    if (
      publicRoutes.some((route) => {
        const pattern = route.replace("(.*)", "");
        return req.nextUrl.pathname.startsWith(pattern);
      })
    ) {
      return NextResponse.next();
    }

    // If user is not authenticated and route is not public, redirect to sign-in
    if (!auth.userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Get user role from session claims
    const role = auth.sessionClaims?.role as string;
    const path = req.nextUrl.pathname;

    // Handle dashboard redirections
    if (path === "/dashboard") {
      switch (role?.toUpperCase()) {
        case "PATIENT":
          return NextResponse.redirect(
            new URL(ROLE_DASHBOARDS.PATIENT, req.url)
          );
        case "PHARMACIST":
          return NextResponse.redirect(
            new URL(ROLE_DASHBOARDS.PHARMACIST, req.url)
          );
        case "ADMIN":
          return NextResponse.redirect(new URL(ROLE_DASHBOARDS.ADMIN, req.url));
        default:
          return NextResponse.redirect(
            new URL("/auth/sign-up/verify-email-address", req.url)
          );
      }
    }

    // Protect role-specific paths
    if (path.startsWith("/dashboard/patient") && role !== "PATIENT") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (path.startsWith("/dashboard/pharmacist") && role !== "PHARMACIST") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (path.startsWith("/dashboard/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // Match all paths except static files
    "/", // Match root path
    "/(api|trpc)(.*)", // Match API and TRPC routes
  ],
};
