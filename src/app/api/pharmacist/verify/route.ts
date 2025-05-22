import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get the user's verification data
    const data = await req.json();
    const { licenseNumber, licenseImage, pharmacyName, pharmacyAddress } = data;

    // Validate required fields
    if (!licenseNumber || !licenseImage || !pharmacyName || !pharmacyAddress) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update user with verification details
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role: "PHARMACIST",
        pharmacistVerification: {
          create: {
            licenseNumber,
            licenseImage,
            pharmacyName,
            pharmacyAddress,
            status: "PENDING",
          },
        },
      },
    });

    return NextResponse.json({
      message: "Verification request submitted successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Error in pharmacist verification:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
