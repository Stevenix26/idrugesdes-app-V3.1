import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "../../../../lib/prisma";

// This should be stored securely in environment variables
const ADMIN_VERIFICATION_CODE =
  process.env.ADMIN_VERIFICATION_CODE || "ADMIN123";

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { employeeId, department, position, verificationCode } = body;

    // Validate required fields
    if (!employeeId || !department || !position || !verificationCode) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Verify admin code
    if (verificationCode !== ADMIN_VERIFICATION_CODE) {
      return new NextResponse("Invalid verification code", { status: 400 });
    }

    // Check if user is already an admin
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (existingUser?.role === "ADMIN") {
      return new NextResponse("User is already an admin", { status: 400 });
    }

    // Update user role to ADMIN
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role: "ADMIN",
        // You might want to store additional admin info in a separate table
        // or add fields to the user table
      },
    });

    // You could also create an AdminProfile table if needed
    // await prisma.adminProfile.create({
    //   data: {
    //     userId,
    //     employeeId,
    //     department,
    //     position,
    //   },
    // });

    return NextResponse.json({
      message: "Admin verification successful",
      user: updatedUser,
    });
  } catch (error) {
    console.error("[ADMIN_VERIFY]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
