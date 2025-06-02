import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // First, create a test prescription if none exists
    let prescription = await prismadb.prescription.findFirst({
      where: {
        status: "approved",
        patientId: userId, // Only find prescriptions for the current user
      },
      include: {
        bill: true,
      },
    });

    if (!prescription) {
      prescription = await prismadb.prescription.create({
        data: {
          patientId: userId, // Set the patientId to the current user
          patientName: "Test Patient",
          medication: "Test Medication",
          dosage: "100mg",
          frequency: "Once daily",
          quantity: 30,
          instructions: "Take with food",
          doctorName: "Dr. Test",
          phoneNumber: "1234567890",
          prescriptionDate: new Date().toISOString(),
          status: "approved",
        },
        include: {
          bill: true,
        },
      });
    }

    // Check if a bill already exists for this prescription
    if (prescription.bill) {
      return NextResponse.json({
        message: "Bill already exists for this prescription",
        testPrescription: prescription,
        existingBill: prescription.bill,
      });
    }

    // Create the bill directly using Prisma
    const bill = await prismadb.prescriptionBill.create({
      data: {
        prescriptionId: prescription.id,
        subtotal: 100.0,
        tax: 10.0,
        total: 110.0,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "PENDING",
        items: {
          create: [
            {
              medicationName: "Test Medication",
              quantity: 30,
              unitPrice: 3.33,
              total: 100.0,
            },
          ],
        },
      },
      include: {
        items: true,
        prescription: {
          include: {
            patient: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Test bill created successfully",
      testPrescription: prescription,
      createdBill: bill,
    });
  } catch (error) {
    console.error("Test Error:", error);
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
