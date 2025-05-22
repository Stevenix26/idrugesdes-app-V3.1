import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs";

// Define role-specific dashboard paths
const ROLE_DASHBOARDS = {
  PATIENT: "/dashboard/patient",
  PHARMACIST: "/dashboard/pharmacist",
  ADMIN: "/dashboard/admin",
};

// Define public paths that don't need role checking
const PUBLIC_PATHS = [
  "/",
  "/sign-in",
  "/sign-up",
  "/contact",
  "/about",
  "/help",
  "/store",
  "/auth/sign-up/verify-email-address",
  "/auth/verify-email",
  "/auth/pharmacist-verification",
  "/auth/admin-verification",
];

export async function roleMiddleware(req: NextRequest) {
  const { userId } = auth();
  const path = req.nextUrl.pathname;

  // Allow public paths
  if (PUBLIC_PATHS.some((publicPath) => path.startsWith(publicPath))) {
    return NextResponse.next();
  }

  // If no user, redirect to sign in
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    // Get user data from our database
    const userResponse = await fetch(
      `${req.nextUrl.origin}/api/users/${userId}`
    );
    const userData = await userResponse.json();

    if (!userData || !userData.role) {
      return NextResponse.redirect(
        new URL("/auth/sign-up/verify-email-address", req.url)
      );
    }

    // Handle dashboard redirections
    if (path === "/dashboard") {
      switch (userData.role.toUpperCase()) {
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
    if (path.startsWith("/dashboard/patient") && userData.role !== "PATIENT") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (
      path.startsWith("/dashboard/pharmacist") &&
      userData.role !== "PHARMACIST"
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (path.startsWith("/dashboard/admin") && userData.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in role middleware:", error);
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}
