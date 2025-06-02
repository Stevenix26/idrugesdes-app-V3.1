import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter") || "all";

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the pharmacist profile
    const pharmacist = await prisma.pharmacist.findUnique({
      where: { userId },
    });

    if (!pharmacist) {
      return NextResponse.json(
        { error: "Pharmacist profile not found" },
        { status: 404 }
      );
    }

    // Get today's date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Build the where clause based on the filter
    let whereClause: any = {
      pharmacistId: pharmacist.id,
    };

    switch (filter) {
      case "pending":
        whereClause.status = "pending";
        break;
      case "approved":
        whereClause.status = "approved";
        break;
      case "rejected":
        whereClause.status = "rejected";
        break;
      case "today":
        whereClause.createdAt = {
          gte: today,
        };
        break;
      // "all" filter doesn't need additional conditions
    }

    // Fetch prescriptions with patient information
    const prescriptions = await prisma.prescription.findMany({
      where: whereClause,
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform the data to match the frontend requirements
    const transformedPrescriptions = prescriptions.map((prescription) => ({
      id: prescription.id,
      patientName: prescription.patient
        ? `${prescription.patient.firstName} ${prescription.patient.lastName}`
        : prescription.patientName,
      status: prescription.status,
      createdAt: prescription.createdAt,
      medication: prescription.medication,
      dosage: prescription.dosage,
      frequency: prescription.frequency,
      duration: prescription.prescriptionDate,
      doctorName: prescription.doctorName,
      phoneNumber: prescription.phoneNumber,
      prescriptionFilePath: prescription.prescriptionFilePath,
      declineReason: prescription.declineReason,
    }));

    return NextResponse.json(transformedPrescriptions);
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    return NextResponse.json(
      { error: "Failed to fetch prescriptions" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { userId } = await auth();
    const { id, status, notes } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the pharmacist profile
    const pharmacist = await prisma.pharmacist.findUnique({
      where: { userId },
    });

    if (!pharmacist) {
      return NextResponse.json(
        { error: "Pharmacist profile not found" },
        { status: 404 }
      );
    }

    // Update the prescription
    const prescription = await prisma.prescription.update({
      where: {
        id,
        pharmacistId: pharmacist.id, // Ensure the prescription belongs to this pharmacist
      },
      data: {
        status,
        declineReason: notes,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(prescription);
  } catch (error) {
    console.error("Error updating prescription:", error);
    return NextResponse.json(
      { error: "Failed to update prescription" },
      { status: 500 }
    );
  }
}
