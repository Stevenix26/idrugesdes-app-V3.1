import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the current user's data from Prisma
    const user = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        prescriptions: true,
        pharmacistProfile: true,
      },
    });

    if (!user) {
      // If user exists in Clerk but not in Prisma
      return NextResponse.json({
        status: "error",
        message: "User exists in Clerk but not in Prisma database",
        clerkUserId: userId,
      });
    }

    // Get all users for comparison (useful for testing)
    const allUsers = await prismadb.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      status: "success",
      message: "User data retrieved successfully",
      currentUser: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        createdAt: user.createdAt,
        prescriptionCount: user.prescriptions?.length || 0,
        isPharmacist: !!user.pharmacistProfile,
      },
      allUsers: allUsers,
      debug: {
        totalUsers: allUsers.length,
        requestTime: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("[TEST_USERS_GET]", error);
    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
