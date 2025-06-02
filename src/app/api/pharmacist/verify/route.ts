import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get the user's role and verification status
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        pharmacistProfile: true,
        pharmacistVerification: true,
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

    // Check if pharmacist profile exists
    if (!user.pharmacistProfile) {
      return NextResponse.json(
        {
          error: "Pharmacist profile not found",
          details: "Please complete your pharmacist profile",
        },
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
      pharmacistId: user.pharmacistProfile.id,
      licenseNumber: user.pharmacistVerification.licenseNumber,
    });
  } catch (error) {
    console.error("Error verifying pharmacist:", error);
    return NextResponse.json(
      { error: "Failed to verify pharmacist status" },
      { status: 500 }
    );
  }
}
