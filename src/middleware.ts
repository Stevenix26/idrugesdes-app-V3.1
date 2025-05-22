import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
    // If the route is ignored, proceed without authentication
    if (auth.isApiRoute && req.nextUrl.pathname === "/api/webhook/clerk") {
      return NextResponse.next();
    }

    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
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
            },
          }
        );

        if (!verifyResponse.ok) {
          // Redirect non-pharmacists to main dashboard
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      } catch (error) {
        console.error("Error verifying pharmacist:", error);
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
