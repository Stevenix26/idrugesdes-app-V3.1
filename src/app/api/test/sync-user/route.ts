import { NextResponse } from "next/server";
import { getAuth, currentUser } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const primaryEmail = user.emailAddresses[0]?.emailAddress;

    if (!primaryEmail) {
      return NextResponse.json({
        status: "error",
        message: "No email address found for user",
        userId,
      });
    }

    // Try to sync user to Prisma
    const syncedUser = await prismadb.user.upsert({
      where: {
        id: userId,
      },
      create: {
        id: userId,
        email: primaryEmail,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumbers?.[0]?.phoneNumber || null,
        role: "PATIENT", // Default role
      },
      update: {
        email: primaryEmail,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumbers?.[0]?.phoneNumber || null,
      },
    });

    return NextResponse.json({
      status: "success",
      message: "User manually synced to Prisma",
      user: {
        id: syncedUser.id,
        email: syncedUser.email,
        firstName: syncedUser.firstName,
        lastName: syncedUser.lastName,
        role: syncedUser.role,
        createdAt: syncedUser.createdAt,
      },
    });
  } catch (error) {
    console.error("[SYNC_USER_ERROR]", error);
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to sync user",
        details: error,
      },
      { status: 500 }
    );
  }
}
