import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    const { userId } = auth();
    console.log("Authenticated userId:", userId);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // First, check if the user has any prescriptions
    const userPrescriptions = await prismadb.prescription.findMany({
      where: {
        patientId: userId,
      },
      select: {
        id: true,
      },
    });
    console.log("User prescriptions:", userPrescriptions);

    // Fetch bills for the user's prescriptions
    const bills = await prismadb.prescriptionBill.findMany({
      where: {
        prescription: {
          patientId: userId,
        },
      },
      include: {
        items: true,
        prescription: {
          select: {
            medication: true,
            doctorName: true,
            prescriptionDate: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log("Found bills:", bills);

    // Transform the data for the frontend
    const transformedBills = bills.map((bill) => ({
      id: bill.id,
      prescriptionId: bill.prescriptionId,
      medication: bill.prescription.medication,
      doctorName: bill.prescription.doctorName,
      prescriptionDate: bill.prescription.prescriptionDate,
      subtotal: bill.subtotal,
      tax: bill.tax,
      total: bill.total,
      status: bill.status,
      dueDate: bill.dueDate,
      createdAt: bill.createdAt,
      items: bill.items.map((item) => ({
        id: item.id,
        medicationName: item.medicationName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total,
      })),
    }));
    console.log("Transformed bills:", transformedBills);

    return NextResponse.json(transformedBills);
  } catch (error) {
    console.error("[BILLS_GET] Detailed error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
