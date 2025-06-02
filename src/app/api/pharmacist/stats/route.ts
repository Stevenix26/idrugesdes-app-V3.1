import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // First verify that the user is a pharmacist
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        pharmacistProfile: true,
        pharmacistVerification: true,
      },
    });

    if (!user || user.role !== "PHARMACIST") {
      return NextResponse.json(
        { error: "Access denied. Only pharmacists can access this endpoint." },
        { status: 403 }
      );
    }

    if (!user.pharmacistProfile) {
      return NextResponse.json(
        { error: "Pharmacist profile not found" },
        { status: 404 }
      );
    }

    if (
      !user.pharmacistVerification ||
      user.pharmacistVerification.status !== "APPROVED"
    ) {
      return NextResponse.json(
        { error: "Pharmacist verification required" },
        { status: 403 }
      );
    }

    // Get today's date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get all prescriptions managed by this pharmacist
    const prescriptions = await prisma.prescription.findMany({
      where: {
        pharmacistId: user.pharmacistProfile.id,
      },
    });

    // Calculate statistics
    const stats = {
      pending: prescriptions.filter((p) => p.status === "pending").length,
      approved: prescriptions.filter((p) => p.status === "approved").length,
      rejected: prescriptions.filter((p) => p.status === "rejected").length,
      todayCount: prescriptions.filter((p) => new Date(p.createdAt) >= today)
        .length,
      totalPrescriptions: prescriptions.length,
      totalPatients: 0, // Initialize with 0, will be updated later
    };

    // Get unique patient count
    const uniquePatients = await prisma.prescription.findMany({
      where: {
        pharmacistId: user.pharmacistProfile.id,
      },
      select: {
        patientId: true,
      },
      distinct: ["patientId"],
    });

    stats.totalPatients = uniquePatients.length;

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching pharmacist stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
