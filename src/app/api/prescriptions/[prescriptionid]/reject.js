import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

const inputValidation = /^[a-zA-Z0-9\s.,!?]{1,255}$/;

export async function PUT(request, { params }) {
  const { prescriptionid } = params;

  // Validate prescription ID
  if (!prescriptionid) {
    return NextResponse.json(
      { error: "Invalid prescription ID" },
      { status: 400 }
    );
  }

  // Parse and validate the reason from request body
  let reason;
  try {
    const body = await request.json();
    reason = body.reason;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate all inputs
  const prescriptionIdNumber = Number.parseInt(prescriptionid, 10);
  if (isNaN(prescriptionIdNumber)) {
    return NextResponse.json(
      { error: "Invalid prescription ID format" },
      { status: 400 }
    );
  }

  if (typeof reason !== "string" || reason.trim().length === 0) {
    return NextResponse.json(
      { error: "Decline reason is required" },
      { status: 400 }
    );
  }

  if (!inputValidation.test(reason)) {
    return NextResponse.json(
      { error: "Invalid decline reason format" },
      { status: 400 }
    );
  }

  try {
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
      where: { id: prescription.id },
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
