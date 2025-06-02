import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get the user's role and verification status
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true,
        pharmacistVerification: {
          select: {
            status: true,
            licenseNumber: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.role !== "PHARMACIST") {
      return NextResponse.json(
        { error: "Access denied. Only pharmacists can access this endpoint." },
        { status: 403 }
      );
    }

    // Check if pharmacist is verified
    if (!user.pharmacistVerification) {
      return NextResponse.json(
        {
          error: "Pharmacist verification required",
          details: "Please complete the verification process",
        },
        { status: 403 }
      );
    }

    if (user.pharmacistVerification.status !== "APPROVED") {
      return NextResponse.json(
        {
          error: "Pharmacist verification pending",
          details: "Your verification is still being processed",
          status: user.pharmacistVerification.status,
        },
        { status: 403 }
      );
    }

    // Return verification status with minimal necessary information
    return NextResponse.json({
      verified: true,
      licenseNumber: user.pharmacistVerification.licenseNumber,
    });
  } catch (error) {
    console.error("Error in pharmacist verification:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
