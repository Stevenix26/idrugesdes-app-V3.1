import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

const inputValidation = /^[a-zA-Z0-9\s.,!?]{1,255}$/;

export async function PUT(request, { params }) {
  const { prescriptionId } = params;

  // Validate prescription ID
  if (!prescriptionId) {
    return NextResponse.json(
      { error: "Invalid prescription ID" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const { reason } = body;

    if (!reason) {
      return NextResponse.json(
        { error: "Rejection reason is required" },
        { status: 400 }
      );
    }

    // Parse and validate the prescription ID
    const prescriptionIdNumber = Number.parseInt(prescriptionId, 10);
    if (isNaN(prescriptionIdNumber)) {
      return NextResponse.json(
        { error: "Invalid prescription ID format" },
        { status: 400 }
      );
    }

    // Find the prescription
    const prescription = await db.prescription.findUnique({
      where: { id: prescriptionIdNumber },
    });

    if (!prescription) {
      return NextResponse.json(
        { error: "Prescription not found" },
        { status: 404 }
      );
    }

    // Check if already rejected
    if (prescription.status === "rejected") {
      return NextResponse.json(
        { error: "Prescription is already rejected" },
        { status: 400 }
      );
    }

    // Update the prescription status
    const updatedPrescription = await db.prescription.update({
      where: { id: prescriptionIdNumber },
      data: {
        status: "rejected",
        declineReason: reason,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: "Prescription rejected successfully",
      prescription: updatedPrescription,
    });
  } catch (error) {
    console.error("Error rejecting prescription:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
// Only allow PUT method for rejection
